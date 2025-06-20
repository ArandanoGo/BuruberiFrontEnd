<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <!-- Flecha fuera del bloque del título -->
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />

      <!-- Título completamente centrado -->
      <h1 class="titulo">Registro de Lotes</h1>

      <pv-button label="Registrar Lote" @click="registrarLote" class="mb-3" />

      <pv-data-table :value="lotes" :paginator="true" :rows="10">
        <pv-column field="id" header="ID" />
        <pv-column field="autor" header="Autor" />
        <pv-column field="fechaRegistro" header="Fecha de registro" />
        <pv-column field="hora" header="Hora" />
        <pv-column field="materiaOrganica" header="Materia Orgánica" />
        <pv-column field="cloruroPotasio" header="Cloruro de Potasio" />
        <pv-column field="fosfato" header="Fosfato" />
        <pv-column field="sulfatoCalcio" header="Sulfato de Calcio" />
        <pv-column field="urea" header="Urea" />
        <pv-column field="sulfatoMagnesio" header="Sulfato de Magnesio" />
        <pv-column field="correctoresPH" header="Correctores pH" />

        <pv-column header="Acción" :exportable="false">
          <template #body="slotProps">
            <div class="acciones">
              <pv-button icon="pi pi-eye" class="p-button-sm p-button-text ver" @click="verResenas(slotProps.data)" />
              <pv-button icon="pi pi-pencil" class="p-button-sm p-button-text editar" @click="editarLote(slotProps.data)" />
              <pv-button icon="pi pi-trash" class="p-button-sm p-button-text eliminar" @click="eliminarLote(slotProps.data)" />
            </div>
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<script>
import LoteService from "../services/lote.service.js";

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      lotes: []
    };
  },
  methods: {
    async fetchLotes() {
      try {
        const response = await LoteService.getAll();
        const idProd = Number(this.id); // ahora viene como prop
        this.lotes = response.data.filter(lote => Number(lote.idProductor) === idProd);
      } catch (error) {
        console.error("Error al obtener los lotes:", error);
      }
    },
    registrarLote() {
      this.$router.push({ name: "LoteCrear", params: { id: this.id } });
    },
    editarLote(lote) {
      console.log("Editar lote:", lote);
      // Puedes implementar la redirección a la vista de edición aquí si la tienes
    },
    async eliminarLote(lote) {
      try {
        await LoteService.delete(lote.id);
        this.lotes = this.lotes.filter(l => l.id !== lote.id);
      } catch (error) {
        console.error("Error al eliminar lote:", error);
        if (error.response) {
          console.error("Respuesta del servidor:", error.response.status, error.response.data);
          alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
          alert("No se recibió respuesta del servidor");
        } else {
          console.error("Error al configurar la petición:", error.message);
          alert("Error: " + error.message);
        }
      }
    },
    verResenas(lote) {
      this.$router.push({ name: "review-lote", params: { id: lote.id } });
    },
    volverAtras() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchLotes();
  }
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

.mb-3 {
  margin-bottom: 1rem;
}

::v-deep .p-datatable thead th {
  background-color: #6a0dad !important;
  color: white !important;
  text-align: center;
}

.acciones {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.editar {
  color: #007bff;
}

.eliminar {
  color: #dc3545;
}

.ver {
  color: #28a745;
}
</style>
