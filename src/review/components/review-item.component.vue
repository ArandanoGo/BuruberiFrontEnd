<script>
import {Card  as PvCard} from "primevue";
import {Review} from "../model/review.entity.js";

export default {
  name: "review-item",
  components: { PvCard },
  props: {
    review: {
      type: Review,
      required: true,
    }
  },
  computed: {
    estrellas() {
      // Asumimos que review.puntuacion es un número entero entre 0 y 5
      const maxEstrellas = 5;
      const llenas = Math.min(Math.max(this.review.puntuacion, 0), maxEstrellas);
      const vacias = maxEstrellas - llenas;
      return {
        llenas: Array(llenas).fill('★'),
        vacias: Array(vacias).fill('☆')
      };
    }
  }
}
</script>

<template>
  <pv-card class="review-card">
    <template #content>
      {{ review.comentario }}
    </template>
    <template #footer>
      <p>
        <span v-for="(estrella, index) in estrellas.llenas" :key="'llena-' + index" style="color: gold; font-size: 1.2em;">
          {{ estrella }}
        </span>
        <span v-for="(estrella, index) in estrellas.vacias" :key="'vacia-' + index" style="color: lightgray; font-size: 1.2em;">
          {{ estrella }}
        </span>
      </p>
    </template>
  </pv-card>
</template>
