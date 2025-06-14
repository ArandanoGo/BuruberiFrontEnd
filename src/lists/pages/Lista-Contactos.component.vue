<template>
  <div class="fondo-blanco">
    <div class="card-contenedor">
      <button class="btn-volver" @click="volverAtras">← Volver</button>
      <h1 class="titulo">Contactos del Distribuidor</h1>

      <ul class="lista-contactos">
        <li v-for="contacto in contactos" :key="contacto.id" class="contacto-item">
          <!-- Mostramos solo idProductor; idealmente cargarías datos del productor con ese id -->
          <strong>Productor ID:</strong> {{ contacto.idProductor }}
        </li>
      </ul>

      <p v-if="contactos.length === 0">No hay contactos para este distribuidor.</p>
    </div>
  </div>
</template>

<script>

import ContactoService from "../services/contactos.service.js";

export default {
  data() {
    return {
      contactos: [],
    };
  },
  methods: {
    async fetchContactos() {
      try {
        const idDistribuidor = this.$route.params.id;
        const response = await ContactoService.findByDistribuidor(idDistribuidor);
        this.contactos = response.data || [];
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        this.contactos = [];
      }
    },
    volverAtras() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchContactos();
  },
};
</script>

<style scoped>
.fondo-blanco {
  background-color: #572364;
  min-height: 100vh;
  padding: 2rem;
  color: #333;
}

.card-contenedor {
  max-width: 600px;
  margin: 0 auto;
  background: #fafafa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.btn-volver {
  background: none;
  border: none;
  color: #572364;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.titulo {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #572364;
}

.lista-contactos {
  list-style-type: none;
  padding: 0;
}

.contacto-item {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
}
</style>
