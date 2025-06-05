<script>
export default {
  name: "page-not-found",
  methods: {
    goToHome() {
      this.$router.replace('/home'); // direct path redirection
    }
  }
}
</script>

<template>
  <div class="not-found-container">
    <div class="message">
      <h1 class="title">404 - Page Not Found</h1>
      <p class="description">The page you are looking for does not exist or has been moved.</p>
      <pv-button
          label="Go to Home"
          icon="pi pi-home"
          @click="goToHome"
          class="p-button-secondary mt-4"
      />
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
  padding: 2rem;
}

.message {
  max-width: 500px;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #8B0000;
}

.description {
  font-size: 1.1rem;
  color: #555;
}
</style>
