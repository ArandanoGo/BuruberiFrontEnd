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

        <!-- Columna fecha con slot personalizado para formateo -->
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
                label="Cambiar Estado"
                class="p-button-sm"
                @click="cambiarEstado(slotProps.data)"
            />
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<script>
import ReservaService from "../services/reserva.service.js";

export default {
  data() {
    return {
      reservas: [],
      estados: ["pendiente", "confirmada", "cancelada"],
    };
  },
  methods: {
    async fetchReservas() {
      try {
        const response = await ReservaService.getAll();
        // Guardamos fechaRegistro sin modificar (ISO string)
        this.reservas = response.data;
      } catch (error) {
        console.error("Error al obtener reservas:", error);
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
    async cambiarEstado(reserva) {
      const indexActual = this.estados.indexOf(reserva.estado);
      const nuevoIndex = (indexActual + 1) % this.estados.length;
      const nuevoEstado = this.estados[nuevoIndex];

      try {
        const reservaActualizada = { ...reserva, estado: nuevoEstado };
        await ReservaService.update(reserva.id, reservaActualizada);
        reserva.estado = nuevoEstado;
        alert(`Estado cambiado a "${nuevoEstado}" para la reserva ID ${reserva.id}`);
      } catch (error) {
        console.error("Error al actualizar estado:", error);
        alert("Error al cambiar el estado.");
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
</style>
