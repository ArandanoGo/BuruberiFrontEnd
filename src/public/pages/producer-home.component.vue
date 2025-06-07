<script>
import HeaderContentProducerComponent from "../component/header-content-producer.component.vue";

export default {
  name: "home-content",
  components: {HeaderContent: HeaderContentProducerComponent},
  methods: {
    goToInventory() {
      this.$router.push('/producer/inventory');
    }
  }
}
</script>

<template>
  <header-content></header-content>
  <div class="home-container">
    <h1 class="title">Welcome to Buruberi</h1>

    <div class="button-group">
      <pv-button
          label="Go to Inventory"
          icon="pi pi-box"
          class="p-button-primary"
          @click="goToInventory"
      />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #6a0dad;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #6a0dad;
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  justify-content: center;
}
</style>
