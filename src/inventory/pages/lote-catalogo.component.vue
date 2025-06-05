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
            </div>
          </div>

          <!-- Botones abajo -->
          <div class="botones-lote">
            <button @click="reservarLote(lote)" class="btn-reservar">Reservar</button>
            <button @click="pedirLote(lote)" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoteService from "../services/lote.service.js";

export default {
  data() {
    return {
      lotes: [],
      imagenDefault: "https://via.placeholder.com/192?text=Sin+imagen",
    };
  },
  methods: {
    async fetchLotes() {
      try {
        const response = await LoteService.getAll();
        this.lotes = response.data;
      } catch (error) {
        console.error("Error al cargar lotes:", error);
      }
    },
    volverAtras() {
      this.$router.go(-1);
    },
    reservarLote(lote) {
      alert(`Reservaste el lote: ${lote.tipo}`);
      // Aquí iría la lógica real para reservar
    },
    pedirLote(lote) {
      alert(`Pediste el lote: ${lote.tipo}`);
      // Aquí iría la lógica real para pedir
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
  justify-content: flex-start; /* cards alineadas a la izquierda por defecto */
}

/* Ajuste para la card-lote: no tan ancha y layout column para permitir botones abajo */
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

/* Contenedor botones */
.botones-lote {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Estilos botones */
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

@media (max-width: 768px) {
  .grid {
    justify-content: center; /* centra las cards */
  }
  .card-lote {
    flex: 0 0 90%; /* ocupan casi todo el ancho y se apilan */
  }
}
</style>
