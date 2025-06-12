<script>
import Create from "../../shared/components/create-and-edit.component.vue";
import { InputNumber as PvInputNumber, InputText as PvInputText } from "primevue";

export default {
  name: "review-item-create-dialog",
  components: { PvInputNumber, PvInputText, Create },
  props: {
    item: null,
    visible: Boolean
  },
  emits: ['cancel-requested', 'save-requested', 'update:visible'],
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    onCanceled() {
      this.$emit('cancel-requested');
    },
    onSaved(entity) {
      this.submitted = true;
      this.$emit('save-requested', entity);
    },
    updateVisibility(val) {
      this.$emit('update:visible', val);
    }
  }
}
</script>

<template>
  <create
      :entity="item"
      :visible="visible"
      entity-name="Review"
      @canceled="onCanceled"
      @saved="onSaved"
      @update:visible="updateVisibility"
  >
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="puntuacion">Puntuación</label>
            <pv-input-number
                id="puntuacion"
                v-model="item.puntuacion"
                :class="{ 'p-invalid': submitted && !item.puntuacion }"
            />
          </pv-float-label>

          <pv-float-label class="mt-3">
            <label for="comentario">Comentario</label>
            <pv-input-text
                id="comentario"
                v-model="item.comentario"
                :class="{ 'p-invalid': submitted && !item.comentario }"
            />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create>
</template>

<style scoped>
/* Estilos específicos si necesitas */
</style>
