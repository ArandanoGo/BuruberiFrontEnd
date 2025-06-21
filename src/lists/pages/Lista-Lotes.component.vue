<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <pv-button icon="pi pi-arrow-left" class="flecha-volver" @click="volverAtras" />
      <h1 class="titulo">Lotes</h1>

      <div class="grid gap-4">
        <div
            v-for="lote in lotes"
            :key="lote.id"
            class="card-lote p-4 border rounded-lg shadow-lg flex flex-col"
        >
          <div class="contenido-flex">
            <img
                :src="lote.imagenUrl || imagenDefault"
                alt="Imagen del lote"
                class="w-48 h-48 object-cover mr-4 rounded"
            />

            <div class="info-lote">
              <h2 class="text-xl font-bold mb-2">{{ lote.tipo }}</h2>
              <p><strong>Precio Unitario:</strong> ${{ lote.precioUnitario }}</p>
              <p><strong>Peso (kg):</strong> {{ lote.pesoKg }}</p>
              <p><strong>Calidad:</strong> {{ lote.calidad }}</p>
              <p><strong>Estado:</strong> {{ lote.estado }}</p>
              <p><strong>Stock:</strong> {{ lote.stock }}</p>
              <p><strong>Fecha Registro:</strong> {{ formatearFecha(lote.fechaRegistro) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoteService from "../services/lote.service.js";

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      lotes: [],
      imagenDefault: "https://via.placeholder.com/192?text=Sin+imagen",
    };
  },
  methods: {
    formatearFecha(fechaISO) {
      if (!fechaISO) return "";
      const [anio, mes, dia] = fechaISO.split("T")[0].split("-");
      return `${dia}/${mes}/${anio}`;
    },
    async fetchLotesPorProductor(idProductor) {
      try {
        const response = await LoteService.getAll();
        this.lotes = response.data.filter(lote => lote.idProductor === String(idProductor));
      } catch (error) {
        console.error("Error al cargar lotes:", error);
      }
    },
    volverAtras() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchLotesPorProductor(this.id);
  },
};
</script>

<style scoped>
/* Reutiliza el mismo CSS que me diste, sin cambios */
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

.card-lote {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: transform 0.2s ease;
  position: relative;
  height: auto;
  flex: 1 1 calc(100% - 2rem);
  max-width: 100%;
}

.card-lote:hover {
  transform: scale(1.01);
}

.contenido-flex {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.card-lote img {
  border-radius: 8px;
  object-fit: cover;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
}

.info-lote {
  flex: 1 1 auto;
  max-width: calc(100% - 160px);
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
}

.info-lote h2 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #6a0dad;
}

/* Responsiveness */

@media (min-width: 600px) {
  .card-lote {
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
  }
}

@media (min-width: 900px) {
  .card-lote {
    flex: 1 1 calc(33.33% - 1rem);
    max-width: calc(33.33% - 1rem);
  }
}
</style>
