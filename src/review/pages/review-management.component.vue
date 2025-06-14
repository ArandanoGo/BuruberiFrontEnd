<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />
      <h1 class="titulo">Reseñas</h1>

      <!-- Botón para nueva reseña -->
      <pv-toolbar class="mb-3">
        <template #center>
          <pv-button class="mr-2" icon="pi pi-plus" label="Publicar reseña" severity="success" @click="onNewItem" />
        </template>
      </pv-toolbar>

      <!-- Lista de reseñas -->
      <div class="review-list">
        <div v-if="reviews.length === 0">
          <h2>No hay reseñas</h2>
        </div>
        <review-item
            v-else
            v-for="review in reviews"
            :key="review.id"
            :review="review"
        />
      </div>

      <!-- Diálogo de creación de reseñas -->
      <review-item-create-dialog
          v-model:visible="createDialogIsVisible"
          :item="review"
          @cancel-requested="onCancelRequested"
          @save-requested="onSaveRequested"
      />
    </div>
  </div>
</template>

<script>
import { Review } from "../model/review.entity.js";
import { ReviewService } from "../services/review.service.js";
import ReviewItemCreateDialog from "../components/review-item-create.component.vue";
import ReviewItem from "../components/review-item.component.vue";

export default {
  name: "review-management",
  components: {
    ReviewItem,
    ReviewItemCreateDialog
  },
  data() {
    return {
      submitted: false,
      reviews: [],
      review: new Review({}),
      createDialogIsVisible: false,
      reviewService: null
    };
  },
  methods: {
    volverAtras() {
      this.$router.go(-1);
    },
    notifySuccessfulAction(message) {
      this.$toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: message,
        life: 3000
      });
    },
    onNewItem() {
      this.review = new Review({});
      this.submitted = false;
      this.createDialogIsVisible = true;
    },
    onCancelRequested() {
      this.createDialogIsVisible = false;
      this.submitted = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (item && item.comentario && item.comentario.trim()) {
        this.createNewReview(item);
        this.createDialogIsVisible = false;
      }
    },
    createNewReview(item) {
      const loteId = this.$route.params.id;
      this.reviewService.createReview(loteId, item).then(response => {
        const review = new Review(response.data);
        this.reviews.push(review);
        this.notifySuccessfulAction("La reseña fue creada");
      }).catch(error => console.error(error));
    }
  },
  created() {
    const loteId = this.$route.params.id;
    this.reviewService = new ReviewService();
    this.reviewService.getReviewsForLoteId(loteId).then(response => {
      this.reviews = response.data.map(review => new Review(review));
    }).catch(error => console.error(error));
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
  margin-bottom: 2rem;
  color: #6a0dad;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

h2 {
  text-align: center;
  color: #333;
}
</style>
