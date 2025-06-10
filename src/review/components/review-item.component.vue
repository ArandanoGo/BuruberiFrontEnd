<script>

import {Review} from "../model/review.entity.js";
import {Card  as PvCard} from "primevue";

export default{
  name: "review-item",
  components: {PvCard},
  props: {
    review: {
      type: Review,
      required: true,
    }
  }
}
</script>

<template>
  <pv-card class="review-card">
    <template #content>
      {{review.comentario}}
    </template>
    <template #footer>
      <p>{{ review.puntuacion}}</p>
    </template>
  </pv-card>
</template>

<style scoped>

</style>