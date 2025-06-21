<template>
<div class="fondo-morado">
<div class="card-contenedor">
  <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />
  <h1 class="titulo">Gestión de Órdenes</h1>

  <pv-data-table :value="ordenes" :paginator="true" :rows="10">
    <pv-column field="id" header="ID" />
    <pv-column field="idDistribuidor" header="ID Distribuidor" />
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
            label="Cambiar Estado"
            class="p-button-sm"
            :disabled="slotProps.data.estado === 'completado'"
            @click="cambiarEstado(slotProps.data)"
        />
      </template>
    </pv-column>
  </pv-data-table>
</div>
</div>
</template>

<script>
import OrderService from "../services/order.service.js";
import LoteService from "../services/lote.service.js";

export default {
  props: ['id'], // id del productor vía ruta
  data() {
    return {
      ordenes: [],
      estados: ["pendiente", "en_proceso", "completado"],
    };
  },
  methods: {
    async fetchOrdenesPorProductor(idProductor) {
      try {
        const loteResp = await LoteService.getAll();
        console.log("Lotes recibidos:", loteResp.data);
        console.log("ID del productor:", idProductor);

        const lotesDel = loteResp.data.filter(
            lote => lote.idProductor?.toString() === idProductor.toString()
        );
        console.log("Lotes del productor:", lotesDel);

        const idsLote = lotesDel.map(l => l.id?.toString());
        console.log("IDs de lotes del productor:", idsLote);

        const ordenResp = await OrderService.getAll();
        console.log("Órdenes totales:", ordenResp.data);

        this.ordenes = ordenResp.data.filter(
            o => idsLote.includes(o.idLote?.toString())
        );
        console.log("Órdenes filtradas:", this.ordenes);
      } catch (err) {
        console.error("Error al filtrar órdenes por productor:", err);
      }
    }
    ,
    volverAtras() {
      this.$router.go(-1);
    },
    formatFecha(fechaStr) {
      if (!fechaStr) return "";
      const d = new Date(fechaStr);
      return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    },
    async cambiarEstado(orden) {
      const idx = this.estados.indexOf(orden.estado);
      const nuevo = this.estados[(idx + 1) % this.estados.length];
      try {
        await OrderService.update(orden.id, { ...orden, estado: nuevo });
        orden.estado = nuevo;
        alert(`Estado cambiado a "${nuevo}" para orden ID ${orden.id}`);
      } catch (err) {
        console.error("Error al cambiar estado:", err);
        alert("Error al cambiar el estado.");
      }
    },
  },
  mounted() {
    if (!this.id) {
      alert("ID del productor no proporcionado.");
      return;
    }
    this.fetchOrdenesPorProductor(this.id);
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
