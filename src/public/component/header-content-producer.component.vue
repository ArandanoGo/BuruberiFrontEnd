<template>
  <header class="navbar">
    <img src="/Icons/logo-blue.png" alt="Empresa" style="width: 50px; height: auto;" />
    <h1>BURUBERI</h1>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #7518a4;
  color: white;
  padding: 1rem 2rem;
  width: 100%;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.back {
  font-size: 1.4rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
<script setup lang="ts">
</script>