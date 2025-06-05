<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />
      <h1 class="titulo">Catálogo de Lotes</h1>

      <div class="grid gap-4">
        <div
            v-for="lote in lotes"
            :key="lote.id"
            class="card-lote p-4 border rounded-lg shadow-lg flex flex-col"
        >
          <div
              class="icono-favorito"
              @click="toggleFavorito(lote)"
              @mouseover="hoverFavorito = lote.id"
              @mouseleave="hoverFavorito = null"
          >
            <i
                class="pi"
                :class="[
                lote.favorito ? 'pi-star-fill favorito' : 'pi-star',
                hoverFavorito === lote.id ? 'icono-hover' : ''
              ]"
            ></i>
          </div>

          <div class="contenido-flex">
            <img
                :src="lote.imagenUrl || imagenDefault"
                alt="Imagen del lote"
                class="w-48 h-48 object-cover mr-4 rounded cursor-pointer"
                @click="mostrarImagen(lote.imagenUrl)"
            />

            <div class="info-lote">
              <h2 class="text-xl font-bold mb-2">{{ lote.tipo }}</h2>
              <p><strong>Precio Unitario:</strong> ${{ lote.precioUnitario }}</p>
              <p><strong>Peso (kg):</strong> {{ lote.pesoKg }}</p>
              <p><strong>Calidad:</strong> {{ lote.calidad }}</p>
              <p><strong>Estado:</strong> {{ lote.estado }}</p>
              <p><strong>Stock:</strong> {{ lote.stock }}</p>
              <p>
                <strong>Fecha Registro:</strong>
                {{ formatearFecha(lote.fechaRegistro) }}
              </p>
            </div>
          </div>

          <div class="botones-lote">
            <button
                @click="reservarLote(lote)"
                class="btn-reservar"
                :disabled="lote.stock <= 0"
            >
              Reservar
            </button>
            <button @click="agregarAlCarrito(lote)" class="btn-pedir">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo para imagen -->
    <pv-dialog
        v-model:visible="imagenDialogVisible"
        modal
        :closable="true"
        class="dialogo-imagen"
        header=""
    >
      <img :src="imagenSeleccionada" alt="Imagen ampliada" class="imagen-ampliada" />
    </pv-dialog>

    <!-- Diálogo para reservar -->
    <pv-dialog v-model:visible="dialogoReservaVisible" header="Reservar Stock" modal>
      <div>
        <p><strong>Stock disponible:</strong> {{ loteSeleccionado?.stock }}</p>
        <pv-input-number
            v-model="stockAReservar"
            inputId="stock"
            :min="1"
            :max="loteSeleccionado?.stock"
            showButtons
        />
        <p v-if="mensajeError" class="mensaje-error">{{ mensajeError }}</p>
      </div>
      <template #footer>
        <pv-button
            label="Cancelar"
            icon="pi pi-times"
            class="p-button-text"
            @click="dialogoReservaVisible = false"
        />
        <pv-button
            label="Reservar"
            icon="pi pi-check"
            class="p-button-text"
            @click="confirmarReserva"
        />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import LoteService from "../services/lote.service.js";
import ReservaService from "../services/reserva.service.js";

export default {
  data() {
    return {
      lotes: [],
      imagenDefault: "https://via.placeholder.com/192?text=Sin+imagen",
      imagenDialogVisible: false,
      imagenSeleccionada: "",
      hoverFavorito: null,
      dialogoReservaVisible: false,
      loteSeleccionado: null,
      stockAReservar: 1,
      mensajeError: "",
    };
  },
  methods: {
    formatearFecha(fechaISO) {
      if (!fechaISO) return "";
      // fechaISO es tipo "YYYY-MM-DD" o "YYYY-MM-DDTHH:mm:ssZ"
      // Para mostrar solo día y mes:
      const [anio, mes, dia] = fechaISO.split("T")[0].split("-");
      return `${dia}/${mes}`;
    },
    async fetchLotes() {
      try {
        const response = await LoteService.getAll();
        this.lotes = response.data
            .filter((lote) => lote.stock > 0)
            .map((lote) => ({ ...lote, favorito: false }));
      } catch (error) {
        console.error("Error al cargar lotes:", error);
      }
    },
    volverAtras() {
      this.$router.go(-1);
    },
    reservarLote(lote) {
      if (lote.stock <= 0) return;
      this.loteSeleccionado = lote;
      this.stockAReservar = 1;
      this.mensajeError = "";
      this.dialogoReservaVisible = true;
    },
    async confirmarReserva() {
      const lote = this.loteSeleccionado;
      const cantidad = this.stockAReservar;

      this.mensajeError = ""; // Limpiar mensaje previo

      if (!lote || cantidad < 1) return;

      if (cantidad > lote.stock) {
        this.mensajeError = "No puede reservar más de lo disponible.";
        return;
      }

      try {
        // Guardar solo fecha YYYY-MM-DD sin hora
        const hoy = new Date();
        const soloFechaISO = hoy.toISOString().split("T")[0]; // "2025-06-05"

        const reserva = {
          idLote: lote.id,
          idDistribuidor: 1, // Cambiar si aplica
          fechaRegistro: soloFechaISO, // SOLO fecha sin hora
          stock: cantidad,
          estado: "pendiente",
        };

        await ReservaService.create(reserva);
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        this.mensajeError = "Error al crear la reserva.";
        return;
      }

      try {
        // Actualizar stock del lote usando PUT
        const loteActualizado = { ...lote, stock: lote.stock - cantidad };
        await LoteService.update(lote.id, loteActualizado);
      } catch (error) {
        console.error("Reserva creada, pero falló al actualizar el stock:", error);
        this.mensajeError = "Reserva creada, pero hubo un error al actualizar el stock.";
        return;
      }

      // Todo ok:
      this.dialogoReservaVisible = false;
      await this.fetchLotes();
      alert("Reserva creada exitosamente.");
    },
    agregarAlCarrito(lote) {
      alert(`Agregaste al carrito el lote: ${lote.tipo}`);
    },
    toggleFavorito(lote) {
      lote.favorito = !lote.favorito;
    },
    mostrarImagen(url) {
      this.imagenSeleccionada = url || this.imagenDefault;
      this.imagenDialogVisible = true;
    },
  },
  mounted() {
    this.fetchLotes();
  },
};
</script>

<style scoped>
/* El estilo igual al tuyo, lo dejo intacto */
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 40px;
  color: black;
}
.card-contenedor {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  position: relative;
}
.flecha-volver {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #572364;
}
.titulo {
  text-align: center;
  margin-bottom: 30px;
  color: #6a0dad;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}
.card-lote {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 0 0 calc(33.33% - 1rem);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}
.card-lote:hover {
  transform: scale(1.05);
}
.contenido-flex {
  display: flex;
  margin-bottom: 1rem;
}
.card-lote img {
  border-radius: 12px;
  object-fit: cover;
  width: 192px;
  height: 192px;
}
.info-lote {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.botones-lote {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.btn-reservar,
.btn-pedir {
  background-color: #6a0dad;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.btn-reservar[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
.btn-reservar:hover:not([disabled]),
.btn-pedir:hover {
  background-color: #520a8a;
}
.icono-favorito {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
}
.icono-favorito .pi {
  color: #ccc;
}
.icono-favorito .favorito {
  color: gold;
}
.icono-hover {
  transform: scale(1.3);
  color: gold !important;
}
.dialogo-imagen {
  max-width: 90vw;
}
.imagen-ampliada {
  max-width: 100%;
  display: block;
  margin: auto;
}
.mensaje-error {
  color: red;
  margin-top: 0.5rem;
}
</style>
