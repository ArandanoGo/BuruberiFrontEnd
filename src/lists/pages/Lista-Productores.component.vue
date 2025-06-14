<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />
      <h1 class="titulo">Listado de Productores</h1>

      <div class="grid gap-4">
        <div
            v-for="productor in productores"
            :key="productor.id"
            class="card-productor p-4 border rounded-lg shadow-lg flex flex-col"
        >
          <div class="contenido-flex">
            <!-- Imagen -->
            <img
                :src="esImagen(productor.url) ? productor.url : imagenDefault"
                alt="Imagen del productor"
                class="imagen-productor"
                @click="mostrarImagen(productor.url)"
            />

            <!-- Información -->
            <div class="info-productor">
              <h2 class="text-xl font-bold mb-2">{{ productor.nombre }}</h2>
              <p><strong>Teléfono:</strong> {{ productor.telefono }}</p>
              <p><strong>Email:</strong> {{ productor.email }}</p>
              <p><strong>Dirección:</strong> {{ productor.direccion }}</p>
              <p><strong>Ciudad:</strong> {{ productor.ciudad }}</p>
              <p><strong>País:</strong> {{ productor.pais }}</p>
              <p><strong>Fecha Registro:</strong> {{ formatearFecha(productor.fechaRegistro) }}</p>
              <p v-if="productor.url && !esImagen(productor.url)">
                <strong>Web:</strong>
                <a :href="productor.url" target="_blank" rel="noopener noreferrer">{{ productor.url }}</a>
              </p>
            </div>
          </div>

          <!-- Botones -->
          <div class="botones-productor">
            <button class="btn-contactar" @click="contactar(productor)">
              Contactar
            </button>
            <button class="btn-lotes" @click="verLotes(productor.id)">
              Ver Lotes
            </button>
          </div>
        </div>
      </div>

      <!-- Diálogo de imagen ampliada -->
      <pv-dialog
          v-model:visible="imagenDialogVisible"
          modal
          :closable="true"
          class="dialogo-imagen"
          header="Imagen del Productor"
      >
        <img :src="imagenSeleccionada" alt="Imagen ampliada" class="imagen-ampliada" />
      </pv-dialog>
    </div>
  </div>
</template>

<script>
import ProductorService from "../services/productor.service.js";
import ContactoService from "../services/contactos.service.js";

export default {
  name: "ListaProductores",
  data() {
    return {
      productores: [],
      imagenDialogVisible: false,
      imagenSeleccionada: "",
      imagenDefault: "https://via.placeholder.com/128?text=Sin+imagen",
      idDistribuidor: "1005" // ⚠️ Este es el ID del distribuidor, se reemplazará luego con el autenticado
    };
  },
  methods: {
    async fetchProductores() {
      try {
        const response = await ProductorService.getAll();
        this.productores = response.data;
      } catch (error) {
        console.error("Error al cargar productores:", error);
      }
    },
    formatearFecha(fechaISO) {
      if (!fechaISO) return "";
      const [anio, mes, dia] = fechaISO.split("T")[0].split("-");
      return `${dia}/${mes}/${anio}`;
    },
    volverAtras() {
      this.$router.go(-1);
    },
    esImagen(url) {
      return url && /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
    },
    mostrarImagen(url) {
      this.imagenSeleccionada = this.esImagen(url) ? url : this.imagenDefault;
      this.imagenDialogVisible = true;
    },
    async contactar(productor) {
      const nuevoContacto = {
        idDistribuidor: this.idDistribuidor,
        idProductor: productor.id
      };

      try {
        // 1. Obtener los contactos actuales del distribuidor
        const response = await ContactoService.findByDistribuidor(nuevoContacto.idDistribuidor);
        const contactosExistentes = response.data || [];

        // 2. Revisar si ya existe contacto con mismo productor y distribuidor
        const existe = contactosExistentes.some(
            c => c.idProductor === nuevoContacto.idProductor && c.idDistribuidor === nuevoContacto.idDistribuidor
        );

        if (existe) {
          alert("Ya tienes agregado este contacto (productor) para este distribuidor.");
          return;
        }

        // 3. Crear nuevo contacto si no existe duplicado
        const createResponse = await ContactoService.create(nuevoContacto);
        console.log("Contacto creado:", createResponse.data);
        alert("¡Contacto creado exitosamente!");
      } catch (error) {
        console.error("Error al crear contacto:", error);
        alert("Hubo un error al crear el contacto.");
      }
    },
    verLotes(idProductor) {
      this.$router.push({ name: "lotes-productor", params: { id: idProductor } });
    }
  },
  mounted() {
    this.fetchProductores();
  }
};
</script>

<style scoped>
/* Todos los estilos permanecen igual, ya estaban bien definidos */
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 2rem;
  color: black;
}

.card-contenedor {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  position: relative;
}

.flecha-volver {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #572364;
  cursor: pointer;
}

.titulo {
  text-align: center;
  margin-bottom: 2rem;
  color: #6a0dad;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card-productor {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  word-break: break-word;
}

.card-productor:hover {
  transform: scale(1.02);
}

.contenido-flex {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.imagen-productor {
  width: 128px;
  height: 128px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
}

.info-productor {
  font-size: 1rem;
  color: #333;
  flex: 1;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

.info-productor h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #6a0dad;
}

.info-productor p {
  margin: 0.15rem 0;
}

.info-productor a {
  color: #572364;
  text-decoration: underline;
  max-width: 100%;
  white-space: normal;
}

.botones-productor {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  gap: 0.5rem;
}

.btn-contactar,
.btn-lotes {
  flex: 1;
  background-color: #6a0dad;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-contactar:hover,
.btn-lotes:hover {
  background-color: #520a8a;
}

.dialogo-imagen {
  max-width: 90vw;
}

.imagen-ampliada {
  max-width: 100%;
  display: block;
  margin: auto;
}

@media (min-width: 600px) {
  .card-productor {
    flex: 1 1 calc(50% - 1rem);
  }
}

@media (min-width: 900px) {
  .card-productor {
    flex: 1 1 calc(33.33% - 1rem);
  }
}
</style>
