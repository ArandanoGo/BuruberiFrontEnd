<template>
  <div class="page">
    <HeaderContentProducer />

    <main class="card">
      <h2>Hola Lucía, bienvenido a <span class="highlight">BURUBERI</span>!</h2>
      <p class="subtitle">Explora una de las funcionalidades</p>

      <div class="welcome-content">
        <img src="/Icons/home.png" class="berry-image" alt="Blueberries" />
        <div class="button-group">
          <button class="menu-button">Registro de lotes <span>➤</span></button>
          <button class="menu-button">Historial de lotes <span>➤</span></button>

          <router-link to="/distributors" class="menu-button">
            Lista Distribuidores <span>➤</span>
          </router-link>

          <button class="menu-button">Generador de reportes <span>➤</span></button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderContentProducer from '@/public/component/header-content-producer.component.vue'
</script>

<style scoped>
.page {
  background-color: #2c003e;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

.card {
  background-color: white;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 18px;
  width: 90%;
  max-width: 1000px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}

.card h2 {
  font-size: 1.8rem;
  margin-bottom: 0.4rem;
}

.highlight {
  color: #7518a4;
}

.subtitle {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #444;
}

.welcome-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.berry-image {
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  border-radius: 12px;
}

.button-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 240px;
}

.menu-button {
  background-color: #7518a4;
  color: white;
  font-size: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: background-color 0.2s ease;
}

.menu-button:hover {
  background-color: #8f2cc6;
}
</style>
