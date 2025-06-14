<template>
  <div class="fondo-morado">
    <div class="card-contenedor menu-grid">

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
          <pv-button label="Mensajes" class="boton-accion" @click="verMensajes" />
          <pv-button label="Lista Productores" class="boton-accion" @click="verProductores" />
          <pv-button label="Lista Contactos" class="boton-accion" @click="verContactos" />
          <pv-button label="Cerrar sesión" class="boton-accion cerrar-sesion" @click="cerrarSesion" />
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
      const response = await DistribuidorService.getById("1005");
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
    verMensajes() {
      this.$router.push({ name: "ChatManagement" });
    },
    cerrarSesion() {
      this.$router.push("/home"); // ← Aquí redirige a la URL /home directamente
    },
    verProductores() {
      this.$router.push({ name: "productores" });
    },
    verContactos() {
      const idDistribuidor = "1005";  // aquí manual // Luego cambiar
      this.$router.push({ name: "contactos-productor", params: { id: idDistribuidor } });
    }
  },
};
</script>


<style scoped>
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 60px 80px;
  box-sizing: border-box;
  position: relative;
}

.card-contenedor {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 50px 60px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 60px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.menu-grid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.boton-cambiar-menu {
  position: absolute;
  top: 25px;
  left: 25px;
  color: #6a0dad;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.panel-izquierdo {
  flex: 1;
  text-align: center;
}

.bienvenida {
  color: #6a0dad;
  margin-bottom: 30px;
  font-size: 2.4rem;
  font-weight: 700;
}

.foto-distribuidor {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #6a0dad;
}

.correo-distribuidor {
  font-size: 20px;
  color: #333;
  margin-top: 15px;
}

.panel-derecho {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  align-items: center;
}

.boton-accion {
  width: 250px;
  font-size: 18px;
  padding: 15px 0;
  font-weight: 600;
  border-radius: 8px;
}

.cerrar-sesion {
  background-color: #eee;
  color: #6a0dad;
  border: 2px solid #6a0dad;
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
