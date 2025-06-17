<template>
  <div class="fondo-morado">
    <div class="card-contenedor menu-grid">
      <template v-if="cargando">
        <p>Cargando promociones...</p>
      </template>

      <template v-else-if="error">
        <p class="error">{{ error }}</p>
      </template>

      <template v-else>
        <!-- Panel izquierdo: resumen -->
        <div class="panel-izquierdo">
          <h2 class="bienvenida">Promoción Vigente</h2>
          <button
              v-if="promociones.length === 0 && !mostrarFormulario"
              @click="mostrarFormulario = true"
              class="btn-crear"
          >
            Crear Código
          </button>
        </div>

        <!-- Panel derecho: promociones y formulario -->
        <div class="panel-derecho">
          <div v-if="promociones.length === 0 && !mostrarFormulario">
            <p>No hay promociones registradas.</p>
          </div>

          <div v-else-if="promociones.length > 0">
            <div v-for="promo in promociones" :key="promo.id" class="promo-card">
              <p><strong>Código:</strong> {{ promo.codigo }}</p>
              <p><strong>Descuento:</strong> {{ promo.descuento }}%</p>
              <p><strong>Caduca:</strong> {{ promo.fecha_caducidad }}</p>
              <button @click="eliminarPromo(promo.id)" class="btn-eliminar">Eliminar</button>
            </div>
          </div>

          <div v-if="mostrarFormulario" class="formulario">
            <h3 class="titulo-formulario">Crear Código de Promoción</h3>
            <input type="number" v-model="nuevo.descuento" placeholder="Descuento %" min="1" max="100" />
            <input type="date" v-model="nuevo.fecha_caducidad" :min="minFecha" />
            <button @click="crearPromo">Generar Código</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import PromotionService from "../services/promotion.service.js";

export default {
  name: "PromotionManagement",
  data() {
    return {
      promociones: [],
      cargando: true,
      error: null,
      productorId: null,
      mostrarFormulario: false,
      nuevo: {
        descuento: "",
        fecha_caducidad: "",
      },
    };
  },
  computed: {
    minFecha() {
      const hoy = new Date().toISOString().split("T")[0];
      return hoy;
    },
  },
  async mounted() {
    this.productorId = this.$route.params.id;
    await this.cargarPromociones();
  },
  methods: {
    async cargarPromociones() {
      try {
        const res = await PromotionService.findByProductor(this.productorId);
        this.promociones = res.data;
      } catch (err) {
        this.error = "No se pudieron cargar las promociones.";
        console.error(err);
      } finally {
        this.cargando = false;
      }
    },
    async crearPromo() {
      if (!this.nuevo.descuento || !this.nuevo.fecha_caducidad) {
        alert("Completa todos los campos");
        return;
      }

      const codigoGenerado = "PROMO-" + Math.random().toString(36).substr(2, 6).toUpperCase();

      const nuevaPromo = {
        IdProductor: this.productorId,
        codigo: codigoGenerado,
        descuento: this.nuevo.descuento,
        fecha_caducidad: this.nuevo.fecha_caducidad,
      };

      try {
        await PromotionService.create(nuevaPromo);
        alert("Promoción creada con éxito");
        this.nuevo = { descuento: "", fecha_caducidad: "" };
        await this.cargarPromociones();
        this.mostrarFormulario = false;
      } catch (e) {
        alert("Error al crear promoción");
        console.error(e);
      }
    },
    async eliminarPromo(id) {
      if (confirm("¿Estás seguro de eliminar esta promoción?")) {
        try {
          await PromotionService.delete(id);
          await this.cargarPromociones();
        } catch (e) {
          alert("No se pudo eliminar");
          console.error(e);
        }
      }
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
}

.menu-grid {
  display: flex;
  justify-content: space-between;
}

.panel-izquierdo {
  flex: 1;
  text-align: center;
}

.panel-derecho {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bienvenida {
  color: #6a0dad;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 30px;
}

.btn-crear {
  background-color: #6a0dad;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
}

.foto-productor {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid #6a0dad;
  object-fit: cover;
}

.promo-card {
  background-color: #6a0dad;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #6a0dad;
}

.error {
  color: red;
  font-size: 1.4rem;
  text-align: center;
}

.formulario {
  margin-top: 20px;
  padding: 20px;
  background-color: #e0cde8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.formulario input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.formulario button {
  background-color: #6a0dad;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.btn-eliminar {
  background-color: crimson;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
}

.titulo-formulario {
  color: black;
  font-size: 1.4rem;
  font-weight: 600;
}
</style>
