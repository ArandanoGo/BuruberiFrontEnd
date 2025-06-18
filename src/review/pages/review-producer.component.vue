<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <!-- Botón de volver -->
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />
      <h1 class="titulo">Reseñas</h1>

      <!-- Filtro por puntuación -->
      <div class="filtro-puntuacion">
        <label for="filtro">Filtrar por puntuación:</label>
        <input
            type="number"
            id="filtro"
            v-model.number="filtroPuntuacion"
            min="1"
            max="5"
            placeholder="1 a 5"
        />
      </div>

      <!-- Lista de reseñas -->
      <div class="review-list">
        <div v-if="reseñasFiltradas.length === 0">
          <h2>No hay reseñas</h2>
        </div>
        <review-item
            v-else
            v-for="review in reseñasFiltradas"
            :key="review.id"
            :review="review"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Review } from "../model/review.entity.js";
import { ReviewService } from "../services/review.service.js";
import ReviewItem from "../components/review-item.component.vue";

export default {
  name: "review-management",
  components: {
    ReviewItem
  },
  data() {
    return {
      reviews: [],
      reviewService: null,
      filtroPuntuacion: null
    };
  },
  computed: {
    reseñasFiltradas() {
      if (!this.filtroPuntuacion) return this.reviews;
      return this.reviews.filter(r => r.puntuacion === this.filtroPuntuacion);
    }
  },
  methods: {
    volverAtras() {
      this.$router.go(-1);
    }
  },
  created() {
    const loteId = this.$route.params.id;
    this.reviewService = new ReviewService();
    this.reviewService
        .getReviewsForLoteId(loteId)
        .then(response => {
          this.reviews = response.data.map(r => new Review(r));
        })
        .catch(error => console.error(error));
  }
};
</script>

<style scoped>
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
  max-width: 900px;
  margin: 0 auto;
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
  margin-bottom: 1.5rem;
  color: #6a0dad;
}

.filtro-puntuacion {
  text-align: center;
  margin-bottom: 1.5rem;
}

.filtro-puntuacion input {
  padding: 0.5rem;
  border: 1px solid #6a0dad;
  border-radius: 6px;
  width: 100px;
  text-align: center;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  text-align: center;
  color: #333;
}
</style>
