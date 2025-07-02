<template>
  <div class="fondo-morado">
    <div class="card-contenedor">
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />
      <h1 class="titulo">Órdenes del Distribuidor</h1>

      <pv-data-table :value="ordenes" :paginator="true" :rows="10">
        <pv-column field="id" header="ID" />
        <pv-column field="idLote" header="ID Lote" />
        <pv-column field="fechaPedido" header="Fecha de Pedido">
          <template #body="slotProps">
            {{ formatFecha(slotProps.data.fechaPedido) }}
          </template>
        </pv-column>
        <pv-column field="cantidad" header="Cantidad" />
        <pv-column field="precioFinal" header="Precio Final">
          <template #body="slotProps">
            S/ {{ slotProps.data.precioFinal?.toFixed(2) }}
          </template>
        </pv-column>
        <pv-column field="estado" header="Estado" />
        <pv-column header="Acción" :exportable="false">
          <template #body="slotProps">
            <pv-button
                label="Mandar mensaje"
                class="p-button-sm p-button-info mr-2"
                @click="mandarMensaje(slotProps.data)"
            />
            <pv-button
                label="Pagar"
                class="p-button-sm p-button-success"
                :disabled="slotProps.data.estado === 'Pagado'"
                @click="pagarOrden(slotProps.data)"
            />
            <div
                v-if="ordenSeleccionada && ordenSeleccionada.id === slotProps.data.id"
                class="paypal-box"
            >
              <button class="cerrar-btn" @click="cerrarPaypal">✖</button>
              <div :id="`paypal-button-container-${slotProps.data.id}`" class="mt-2"></div>
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<script>
import OrderService from "../services/order.service.js";

export default {
  props: ['id'],
  data() {
    return {
      ordenes: [],
      ordenSeleccionada: null,
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
    cerrarPaypal() {
      const containerId = `paypal-button-container-${this.ordenSeleccionada?.id}`;
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = "";
      this.ordenSeleccionada = null;
    },
    pagarOrden(orden) {
      this.ordenSeleccionada = orden;

      this.$nextTick(() => {
        const containerId = `paypal-button-container-${orden.id}`;
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "";

        paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: orden.precioFinal?.toFixed(2) || '0.00'
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(async (details) => {
              alert(`✅ Pago completado por ${details.payer.name.given_name}`);

              // Cambiar estado a "Pagado"
              const ordenActualizada = {
                ...orden,
                estado: "Pagado"
              };

              try {
                await OrderService.update(orden.id, ordenActualizada);
                orden.estado = "Pagado";
                this.ordenSeleccionada = null;
              } catch (error) {
                console.error("❌ Error actualizando estado de la orden:", error);
                alert("El pago se procesó, pero no se pudo actualizar el estado.");
              }
            });
          }
        }).render(`#${containerId}`);
      });
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

.mt-2 {
  margin-top: 1rem;
}

.paypal-box {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  background: #f9f9f9;
  margin-top: 10px;
}

.cerrar-btn {
  position: absolute;
  top: 2px;
  right: 6px;
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #a00;
}
</style>
