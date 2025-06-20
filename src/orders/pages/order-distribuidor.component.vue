<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <!-- Flecha para volver atrás -->
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />

      <!-- Título -->
      <h1 class="titulo">Órdenes del Distribuidor</h1>

      <!-- Tabla de órdenes -->
      <pv-data-table :value="ordenes" :paginator="true" :rows="10">
        <pv-column field="id" header="ID" />
        <pv-column field="idLote" header="ID Lote" />
        <pv-column field="fechaPedido" header="Fecha de Pedido">
          <template #body="slotProps">
            {{ formatFecha(slotProps.data.fechaPedido) }}
          </template>
        </pv-column>
        <pv-column field="cantidad" header="Cantidad" />
        <pv-column field="estado" header="Estado" />

        <pv-column header="Acción" :exportable="false">
          <template #body="slotProps">
            <pv-button
                label="Mandar mensaje"
                class="p-button-sm p-button-info"
                @click="mandarMensaje(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<script>
import OrderService from "../services/order.service.js";

export default {
  props: ['id'],  // 👈 Recibe el ID desde la ruta como prop
  data() {
    return {
      ordenes: [],
    };
  },
  methods: {
    async fetchOrdenesDistribuidor(idDistribuidor) {
      try {
        const response = await OrderService.findByDistribuidor(idDistribuidor);
        this.ordenes = response.data;
      } catch (error) {
        console.error("Error al obtener órdenes del distribuidor:", error);
      }
    },
    volverAtras() {
      this.$router.go(-1);
    },
    formatFecha(fechaStr) {
      if (!fechaStr) return "";
      const fecha = new Date(fechaStr);
      const dia = String(fecha.getDate()).padStart(2, "0");
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },
    mandarMensaje(orden) {
      alert(`Funcionalidad para mandar mensaje desde orden ID ${orden.id} (a implementar)`);
    },
  },
  mounted() {
    if (!this.id) {
      alert("ID de distribuidor no proporcionado en la ruta.");
      return;
    }
    this.fetchOrdenesDistribuidor(this.id);
  },
};
</script>


<style scoped>
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
}

.card-contenedor {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.flecha-volver {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #572364;
}

.titulo {
  text-align: center;
  margin-bottom: 30px;
  color: #6a0dad;
}

::v-deep .p-datatable thead th {
  background-color: #6a0dad !important;
  color: white !important;
  text-align: center;
}

.p-button-sm {
  font-size: 0.8rem;
}
</style>
