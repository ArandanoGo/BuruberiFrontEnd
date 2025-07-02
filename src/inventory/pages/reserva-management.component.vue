<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <!-- Flecha para volver atrás -->
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />

      <!-- Título -->
      <h1 class="titulo">Gestión de Reservas</h1>

      <pv-data-table :value="reservas" :paginator="true" :rows="10">
        <pv-column field="id" header="ID" />
        <pv-column field="idLote" header="ID Lote" />

        <pv-column field="fechaRegistro" header="Fecha de Registro">
          <template #body="slotProps">
            {{ formatFecha(slotProps.data) }}
          </template>
        </pv-column>

        <pv-column field="stock" header="Stock" />
        <pv-column field="estado" header="Estado" />

        <pv-column header="Acción" :exportable="false">
          <template #body="slotProps">
            <pv-button
                label="Aceptar"
                class="p-button-sm p-button-success"
                :disabled="['aceptada', 'rechazada'].includes(slotProps.data.estado)"
                @click="aceptarReserva(slotProps.data)"
            />
            <pv-button
                label="Rechazar"
                class="p-button-sm p-button-danger ml-2"
                :disabled="['aceptada', 'rechazada'].includes(slotProps.data.estado)"
                @click="rechazarReserva(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<script>
import ReservaService from "../services/reserva.service.js";
import LoteService from "../services/lote.service.js";
import OrderService from "../services/order.service.js";

export default {
  props: ['id'], // idProductor recibido desde la ruta
  data() {
    return {
      reservas: [],
      lotes: [],
    };
  },
  methods: {
    async fetchReservas() {
      try {
        const [reservasResponse, lotesResponse] = await Promise.all([
          ReservaService.getAll(),
          LoteService.getAll()
        ]);

        this.lotes = lotesResponse.data;

        const idProd = this.id.toString();
        const lotesDelProductor = this.lotes.filter(
            lote => lote.idProductor?.toString() === idProd
        );

        const idsLotesProductor = lotesDelProductor.map(lote => lote.id);

        this.reservas = reservasResponse.data.filter(reserva =>
            idsLotesProductor.includes(reserva.idLote)
        );

      } catch (error) {
        console.error("Error al obtener reservas o lotes:", error);
      }
    },

    volverAtras() {
      this.$router.go(-1);
    },

    formatFecha(rowData) {
      if (!rowData.fechaRegistro) return "";
      const fecha = new Date(rowData.fechaRegistro);
      const dia = String(fecha.getDate()).padStart(2, "0");
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anio = fecha.getFullYear();
      return `${dia}/${mes}/${anio}`;
    },

    async aceptarReserva(reserva) {
      if (["aceptada", "rechazada"].includes(reserva.estado)) return;

      try {
        // Buscar el lote relacionado a la reserva
        const lote = this.lotes.find(l => l.id === reserva.idLote);
        if (!lote) {
          alert("❌ Lote no encontrado.");
          return;
        }

        // Calcular el precio final (stock * precioUnitario)
        const precioFinal = reserva.stock * lote.precioUnitario;

        // Crear la orden incluyendo precioFinal
        const nuevaOrden = {
          idDistribuidor: reserva.idDistribuidor,
          idLote: reserva.idLote,
          cantidad: reserva.stock,
          estado: "pendiente",
          fechaPedido: new Date().toISOString(),
          precioFinal: precioFinal,
        };

        await OrderService.create(nuevaOrden);

        // Actualizar el estado de la reserva a "aceptada"
        const reservaActualizada = { ...reserva, estado: "aceptada" };
        await ReservaService.update(reserva.id, reservaActualizada);

        reserva.estado = "aceptada";

        alert(`✅ Reserva ID ${reserva.id} aceptada y orden creada con precioFinal: S/ ${precioFinal.toFixed(2)}`);
      } catch (error) {
        console.error("Error al aceptar reserva:", error);
        alert("❌ Ocurrió un error al aceptar la reserva.");
      }
    } ,

    async rechazarReserva(reserva) {
      if (["aceptada", "rechazada"].includes(reserva.estado)) return;

      try {
        const loteResponse = await LoteService.getById(reserva.idLote);
        const lote = loteResponse.data;

        const nuevoStock = lote.stock + reserva.stock;
        const loteActualizado = {...lote, stock: nuevoStock};
        await LoteService.update(lote.id, loteActualizado);

        const reservaActualizada = {...reserva, estado: "rechazada"};
        await ReservaService.update(reserva.id, reservaActualizada);

        reserva.estado = "rechazada";

        alert(`Reserva ID ${reserva.id} rechazada y stock devuelto al lote.`);
      } catch (error) {
        console.error("Error al rechazar reserva:", error);
        alert("Ocurrió un error al rechazar la reserva.");
      }
    },
  },
  mounted() {
    this.fetchReservas();
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

.ml-2 {
  margin-left: 0.5rem;
}
</style>
