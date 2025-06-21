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
        <!-- Panel izquierdo: imagen y datos del productor -->
        <div class="panel-izquierdo">
          <h2 class="bienvenida">Bienvenido, {{ productor.nombre }}</h2>
          <img
              :src="productor.url || 'https://via.placeholder.com/150'"
              alt="Foto del productor"
              class="foto-productor"
          />
          <p class="correo-productor">{{ productor.email }}</p>
        </div>

        <!-- Panel derecho: acciones -->
        <div class="panel-derecho">
          <pv-button label="Registrar Lote" class="boton-accion" @click="registrarLote" />
          <pv-button label="Historial de Lote" class="boton-accion" @click="verHistorial" />
          <pv-button label="Mensajes" class="boton-accion" @click="verMensajes" />
          <pv-button label="Código Promoción" class="boton-accion" @click="vercodigopromo" />
          <pv-button label="Ver Pedidos" class="boton-accion" @click="verPedidos" />
          <pv-button label="Cerrar sesión" class="boton-accion cerrar-sesion" @click="cerrarSesion" />
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import ProductorService from "../services/productor.service.js";

export default {
  name: "MenuProductor",
  props: ['id'], // Recibe el id desde la ruta
  data() {
    return {
      productor: null,
      cargando: true,
      error: null,
    };
  },
  async mounted() {
    if (!this.id) {
      this.error = "No se recibió un ID válido.";
      this.cargando = false;
      return;
    }
    try {
      const response = await ProductorService.getById(this.id);
      this.productor = response.data;
    } catch (e) {
      this.error = "No se pudo cargar la información del productor";
      console.error(e);
    } finally {
      this.cargando = false;
    }
  },
  methods: {
    registrarLote() {
      this.$router.push({ name: "LoteManagement", params: { id: this.id } });
    },
    verHistorial() {
      this.$router.push({ name: "ReservaManagement", params: { id: this.id } });
    },
    irMenuDistribuidor() {
      this.$router.push({ name: "MenuDistribuidor" });
    },
    verMensajes() {
      this.$router.push({ name: "ChatManagement2", params: { id: this.id } } );
    },
    vercodigopromo() {
      this.$router.push({ name: "PromotionManagement", params: { id: this.id } });
    },
    verPedidos() {
      this.$router.push({ name: "order-management", params: { id: this.id } });
    },
    cerrarSesion() {
      this.$router.push("/home");
    },
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

/* Panel izquierdo */
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

.foto-productor {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #6a0dad;
}

.correo-productor {
  font-size: 20px;
  color: #333;
  margin-top: 15px;
}

/* Panel derecho */
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

/* Botón cambiar menú distribuidor */
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
    padding: 30px 40px;
    max-width: 600px;
    gap: 40px;
  }
  .menu-grid {
    flex-direction: column;
  }
  .panel-izquierdo, .panel-derecho {
    flex: unset;
    width: 100%;
    text-align: center;
  }
  .boton-accion {
    width: 100%;
    font-size: 16px;
    padding: 12px 0;
  }
  .foto-productor {
    width: 180px;
    height: 180px;
  }
  .bienvenida {
    font-size: 2rem;
  }
  .correo-productor {
    font-size: 18px;
  }
  .boton-cambiar-menu {
    font-size: 1.8rem;
    top: 15px;
    left: 15px;
  }
}

@media (max-width: 576px) {
  .fondo-morado {
    padding: 40px 20px;
  }
  .card-contenedor {
    padding: 20px 20px;
    max-width: 100%;
  }
  .foto-productor {
    width: 140px;
    height: 140px;
  }
  .bienvenida {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }
  .correo-productor {
    font-size: 16px;
  }
  .boton-accion {
    font-size: 14px;
    padding: 10px 0;
  }
  .boton-cambiar-menu {
    font-size: 1.5rem;
    top: 10px;
    left: 10px;
  }
}
</style>
