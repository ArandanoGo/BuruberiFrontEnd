<script>
import {Review} from "../model/review.entity.js";
import {ReviewService} from "../services/review.service.js";
import ReviewItemCreateDialog from "../components/review-item-create.component.vue";
import ReviewItem from "../components/review-item.component.vue";
import DataManager from "../../shared/components/data-manager.component.vue";
import Create from "../../shared/components/create.component.vue";

export default {
  name: "review-management",
  components: {ReviewItem, ReviewItemCreateDialog, DataManager, Create},
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false,
      item: null,
      visible: false,
      reviews: [],
      reviewService: null,
      createDialogIsVisible: false,
      review: new Review({}),
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    onNewItem() {
      this.review = new Review({});
      this.submitted = false;
      this.createDialogIsVisible = true;
      console.log(this.createDialogIsVisible);
    },
    onCancelRequested() {
      this.createDialogIsVisible = false;
      this.submitted = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (item && item.comentario && item.comentario.trim()) {
        this.createNewReview(item);
        this.createDialogIsVisible = false;
      }
    },
    createNewReview(item) {
      const loteId = this.$route.params.id;
      this.reviewService.createReview(loteId,item).then(response => {
        let review = new Review(response.data);
        this.reviews.push(review);
        this.notifySuccessfulAction("La reseña fue creada");
      }).catch(error => console.error(error));
    }
  },
  created(){
    const loteId = this.$route.params.id;
    this.reviewService = new ReviewService();
    this.reviewService.getReviewsForLoteId(loteId).then(response => {
      this.reviews = response.data.map(review => new Review(review));
      console.log(this.reviews);
    }).catch(error => console.error(error));
  }
}
</script>

<template>
  <div class="lote-container">
    <h1>Reseñas</h1>
    <pv-toolbar>
      <template #center>
        <pv-button class="mr-2" icon="pi pi-plus" label="Publicar reseña" severity="success" @click="onNewItem"/>
      </template>
    </pv-toolbar>
    <div class="review-list">
      <div v-if="reviews.length === 0">
        <h1>No hay reseñas</h1>
      </div>
      <review-item v-else v-for="review in reviews" :key="review.id" :review="review"></review-item>
    </div>
  </div>
  <review-item-create-dialog
      :item="review"
      :visible="createDialogIsVisible"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested"/>
</template>

<style scoped>

</style>