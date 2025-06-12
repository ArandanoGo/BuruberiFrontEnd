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
    notifySuccessfulAction(message) {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
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

<template>
  <div class="lote-container">
    <h1>Reseñas</h1>

    <!-- Botón para nueva reseña -->
    <pv-toolbar>
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
</template>

<style scoped>
</style>
