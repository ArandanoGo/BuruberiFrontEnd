<template>
  <div class="fondo-morado">
    <div class="card-contenedor menu-grid">

      <!-- Botón para cambiar a menú productor -->
      <pv-button
          icon="pi pi-arrow-left"
          class="boton-cambiar-menu"
          @click="irMenuProductor"
          aria-label="Ir al menú productor"
      />

      <template v-if="cargando">
        <p>Cargando datos...</p>
      </template>

      <template v-else-if="error">
        <p class="error">{{ error }}</p>
      </template>

      <template v-else>
        <!-- Panel izquierdo: imagen y datos del distribuidor -->
        <div class="panel-izquierdo">
          <h2 class="bienvenida">Bienvenido, {{ distribuidor.nombre }}</h2>
          <img
              :src="distribuidor.url || 'https://via.placeholder.com/150'"
              alt="Foto del distribuidor"
              class="foto-distribuidor"
          />
          <p class="correo-distribuidor">{{ distribuidor.email }}</p>
        </div>

        <!-- Panel derecho: acciones -->
        <div class="panel-derecho">
          <pv-button label="Catálogo" class="boton-accion" @click="verCatalogo" />
          <pv-button label="Pedidos" class="boton-accion" @click="verPedidos" />
          <pv-button label="Favoritos" class="boton-accion" @click="verFavoritos" />
          <!-- Nuevo botón Mensajes -->
          <pv-button label="Mensajes" class="boton-accion" @click="verMensajes" />
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import DistribuidorService from "../services/distribuidor.service.js";

export default {
  name: "MenuDistribuidor",
  data() {
    return {
      distribuidor: null,
      cargando: true,
      error: null,
    };
  },
  async mounted() {
    try {
      const response = await DistribuidorService.getById("1005"); // Cambia el ID si es necesario
      this.distribuidor = response.data;
    } catch (e) {
      this.error = "No se pudo cargar la información del distribuidor";
      console.error(e);
    } finally {
      this.cargando = false;
    }
  },
  methods: {
    verCatalogo() {
      this.$router.push({ name: "LoteCatalogo" });
    },
    verPedidos() {
      this.$router.push({ name: "PedidosManagement" });
    },
    verFavoritos() {
      this.$router.push({ name: "FavoritoManagement" });
    },
    irMenuProductor() {
      this.$router.push({ name: "MenuProductor" });
    },
    verMensajes() {
      this.$router.push({ name: "ChatManagement" });  // Cambia "Mensajes" por el nombre de ruta que uses
    },
  },
};
</script>
<style scoped>
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 60px 80px; /* Igual que productor */
  box-sizing: border-box;
  position: relative;
}

.card-contenedor {
  background-color: #ffffff;
  border-radius: 16px; /* Igual que productor */
  padding: 50px 60px; /* Igual que productor */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  max-width: 1200px; /* Igual que productor */
  margin: 0 auto;
  display: flex;
  gap: 60px; /* Igual que productor */
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.menu-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* Botón cambiar menú productor */
.boton-cambiar-menu {
  position: absolute;
  top: 25px;
  left: 25px;
  color: #6a0dad;
  font-size: 2rem; /* Más grande, igual que productor */
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

/* Panel izquierdo */
.panel-izquierdo {
  flex: 1;
  text-align: center;
}

.bienvenida {
  color: #6a0dad;
  margin-bottom: 30px;
  font-size: 2.4rem; /* Igual que productor */
  font-weight: 700;
}

.foto-distribuidor {
  width: 220px; /* Igual que productor */
  height: 220px; /* Igual que productor */
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #6a0dad; /* Igual que productor */
}

.correo-distribuidor {
  font-size: 20px; /* Igual que productor */
  color: #333;
  margin-top: 15px;
}

/* Panel derecho */
.panel-derecho {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px; /* Igual que productor */
  align-items: center;
}

.boton-accion {
  width: 250px; /* Igual que productor */
  font-size: 18px; /* Igual que productor */
  padding: 15px 0;
  font-weight: 600;
  border-radius: 8px;
}

.error {
  color: red;
  text-align: center;
  width: 100%;
  font-size: 1.4rem;
}

/* Responsive: tablets y móviles */
@media (max-width: 992px) {
  .card-contenedor {
    flex-direction: column;
    padding: 40px 50px;
    max-width: 600px;
    gap: 40px;
  }
  .menu-grid {
    flex-direction: column;
  }
  .panel-izquierdo,
  .panel-derecho {
    flex: unset;
    width: 100%;
    text-align: center;
  }
  .boton-accion {
    width: 100%;
    font-size: 16px;
    padding: 12px 0;
  }
  .foto-distribuidor {
    width: 180px;
    height: 180px;
  }
  .bienvenida {
    font-size: 2rem;
  }
  .correo-distribuidor {
    font-size: 18px;
  }
  .boton-cambiar-menu {
    font-size: 1.8rem;
    top: 20px;
    left: 20px;
  }
}

@media (max-width: 576px) {
  .fondo-morado {
    padding: 30px 15px;
  }
  .card-contenedor {
    padding: 20px 20px;
    max-width: 100%;
  }
  .foto-distribuidor {
    width: 140px;
    height: 140px;
  }
  .bienvenida {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
  .correo-distribuidor {
    font-size: 16px;
  }
  .boton-accion {
    font-size: 14px;
    padding: 10px 0;
  }
  .boton-cambiar-menu {
    font-size: 1.5rem;
    top: 15px;
    left: 15px;
  }
}
</style>

