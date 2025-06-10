<script>
import {FilterMatchMode} from "@primevue/core";

export default {
  name: "data-manager",
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
  },
  emits: ['new-item-requested'],
  data() {
    return {
      selectedItems: [],
      filters: null
    }
  },
  methods: {
    initFilters() {
      this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
    },
    newItem() {
      this.$emit('new-item-requested');
    },
  },
  created() {
    this.initFilters();
  },
}
</script>

<template>
  <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
</template>

<style scoped>

</style>