<script>

import Create from "../../shared/components/create-and-edit.component.vue";
import {InputNumber as PvInputNumber} from "primevue";

export default {
  name: "review-item-create-dialog",
  components: {PvInputNumber, Create},
  props: {
    item: null,
    visible: false
  },
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
}
</script>

<template>
  <create :entity="item" :visible="visible" entity-name="Review"
          @cancel-action-requested="onCancelRequested"
          @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="title">Puntuacion</label>
            <pv-input-number id="puntuacion" v-model="item.puntuacion" :class="{ 'p-invalid': submitted && !item.puntuacion }"/>
          </pv-float-label>
          <pv-float-label>
            <label for="content">Comentario</label>
            <pv-input-text id="comantario" v-model="item.comentario" :class="{ 'p-invalid': submitted && !item.comentario }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create>
</template>

<style scoped>

</style>