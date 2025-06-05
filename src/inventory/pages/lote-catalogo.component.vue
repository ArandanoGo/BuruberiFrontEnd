<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <!-- Flecha para volver -->
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />

      <!-- Título centrado -->
      <h1 class="titulo">Catálogo de Lotes</h1>

      <div class="grid gap-4">
        <div
            v-for="lote in lotes"
            :key="lote.id"
            class="card-lote p-4 border rounded-lg shadow-lg flex flex-col"
        >
          <!-- Ícono de favorito -->
          <div class="icono-favorito" @click="toggleFavorito(lote)" @mouseover="hoverFavorito = lote.id" @mouseleave="hoverFavorito = null">
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
            </div>
          </div>

          <!-- Botones abajo -->
          <div class="botones-lote">
            <button @click="reservarLote(lote)" class="btn-reservar">Reservar</button>
            <button @click="agregarAlCarrito(lote)" class="btn-pedir">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo para ver imagen sin header -->
    <pv-dialog v-model:visible="imagenDialogVisible" modal :closable="true" class="dialogo-imagen" header="">
      <img :src="imagenSeleccionada" alt="Imagen ampliada" class="imagen-ampliada" />
    </pv-dialog>
  </div>
</template>

<script>
import LoteService from "../services/lote.service.js";

export default {
  data() {
    return {
      lotes: [],
      imagenDefault: "https://via.placeholder.com/192?text=Sin+imagen",
      imagenDialogVisible: false,
      imagenSeleccionada: "",
      hoverFavorito: null,
    };
  },
  methods: {
    async fetchLotes() {
      try {
        const response = await LoteService.getAll();
        this.lotes = response.data.map(lote => ({
          ...lote,
          favorito: false,
        }));
      } catch (error) {
        console.error("Error al cargar lotes:", error);
      }
    },
    volverAtras() {
      this.$router.go(-1);
    },
    reservarLote(lote) {
      alert(`Reservaste el lote: ${lote.tipo}`);
    },
    agregarAlCarrito(lote) {
      alert(`Agregaste al carrito el lote: ${lote.tipo}`);
    },
    toggleFavorito(lote) {
      lote.favorito = !lote.favorito;
      alert(lote.favorito ? `Agregaste a favoritos: ${lote.tipo}` : `Quitaste de favoritos: ${lote.tipo}`);
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
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  color: black;
}

.card-contenedor {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin: 0;
  position: relative;
  color: black;
  box-sizing: border-box;
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
  user-select: none;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

/* Animación crecimiento de card al pasar el mouse */
.card-lote {
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 0 0 calc(33.33% - 1rem);
  box-sizing: border-box;
  color: black;
  margin: 0;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.card-lote:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
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
  margin-right: 1rem;
  cursor: pointer;
}

.info-lote {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-lote h2 {
  margin-bottom: 0.5rem;
}

.card-lote p {
  margin: 0.2rem 0;
}

.botones-lote {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-reservar,
.btn-pedir {
  background-color: #6a0dad;
  border: none;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-reservar:hover {
  background-color: #520a8a;
}

.btn-pedir:hover {
  background-color: #450774;
}

.icono-favorito {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.icono-favorito .pi {
  color: #ccc;
}

.icono-favorito .favorito {
  color: gold;
}

/* Animación al pasar mouse sobre icono favorito */
.icono-hover {
  transform: scale(1.3);
  color: gold !important;
}

/* Diálogo imagen */
.dialogo-imagen {
  width: auto;
  max-width: 90vw;
}

.imagen-ampliada {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .grid {
    justify-content: center;
  }
  .card-lote {
    flex: 0 0 90%;
  }
}
</style>
