<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <!-- Flecha para volver -->
      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="cancelar" />

      <!-- Título centrado -->
      <h1 class="titulo">Registrar Nuevo Lote</h1>

      <div class="form-container">
        <div class="form-field">
          <label>Autor</label>
          <pv-input-text v-model="lote.autor" />
        </div>

        <div class="form-field">
          <label>Fecha de Registro</label>
          <pv-input-text :value="lote.fechaRegistro" disabled />
        </div>

        <div class="form-field">
          <label>Hora</label>
          <pv-input-text :value="lote.hora" disabled />
        </div>

        <div class="form-field">
          <label>Tipo</label>
          <pv-input-text v-model="lote.tipo" />
        </div>

        <!-- NUEVO CAMPO: URL de imagen -->
        <div class="form-field">
          <label>URL de la Imagen</label>
          <pv-input-text v-model="lote.imagenUrl" placeholder="https://ejemplo.com/imagen.jpg" />
        </div>

        <div class="form-field">
          <label>Precio Unitario</label>
          <pv-input-number v-model="lote.precioUnitario" mode="currency" currency="USD" locale="en-US" />
        </div>

        <div class="form-field">
          <label>Peso (Kg)</label>
          <pv-input-number v-model="lote.pesoKg" />
        </div>

        <div class="form-field">
          <label>Calidad</label>
          <pv-input-text v-model="lote.calidad" />
        </div>

        <div class="form-field">
          <label>Estado</label>
          <pv-input-text v-model="lote.estado" />
        </div>

        <div class="form-field">
          <label>Stock</label>
          <pv-input-number v-model="lote.stock" />
        </div>

        <div class="form-field" v-for="(label, key) in insumos" :key="key">
          <label>{{ label }}</label>
          <pv-input-number v-model="lote[key]" />
        </div>

        <div class="botones">
          <pv-button label="Cancelar" class="p-button-text" @click="cancelar" />
          <pv-button label="Guardar" @click="guardar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoteService from "../services/lote.service.js";

export default {
  name: "LoteCrear",
  data() {
    return {
      lote: {
        autor: '',
        fechaRegistro: '',
        hora: '',
        tipo: '',
        imagenUrl: '',
        precioUnitario: null,
        pesoKg: null,
        calidad: '',
        estado: '',
        stock: null,
        fechaPedido: null,
        idProductor: null,  // se asignará desde la ruta

        // insumos
        materiaOrganica: null,
        cloruroPotasio: null,
        fosfato: null,
        sulfatoCalcio: null,
        urea: null,
        sulfatoMagnesio: null,
        correctoresPH: null,
      },
      insumos: {
        materiaOrganica: "Materia Orgánica",
        cloruroPotasio: "Cloruro de Potasio",
        fosfato: "Fosfato",
        sulfatoCalcio: "Sulfato de Calcio",
        urea: "Urea",
        sulfatoMagnesio: "Sulfato de Magnesio",
        correctoresPH: "Correctores pH",
      },
    };
  },
  created() {
    const id = this.$route.params.id;
    if (!id) {
      alert("No se proporcionó el ID del productor en la ruta.");
      this.$router.back();
      return;
    }
    // Asignar idProductor como string sin conversión
    this.lote.idProductor = id;
    this.generarFechaYHora();
  },
  methods: {
    generarFechaYHora() {
      const now = new Date();

      const dia = String(now.getDate()).padStart(2, '0');
      const mes = String(now.getMonth() + 1).padStart(2, '0');
      const anio = now.getFullYear();
      this.lote.fechaRegistro = `${dia}/${mes}/${anio}`;

      const horas = String(now.getHours()).padStart(2, '0');
      const minutos = String(now.getMinutes()).padStart(2, '0');
      this.lote.hora = `${horas}:${minutos}`;
    },
    async guardar() {
      try {
        await LoteService.create(this.lote);
        this.$router.push({ name: 'LoteManagement', params: { id: this.lote.idProductor } });
      } catch (error) {
        console.error("Error guardando lote:", error);
        alert("Error al guardar el lote. Intenta nuevamente.");
      }
    },
    cancelar() {
      this.$router.back();
    },
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
  max-width: 700px;
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
  user-select: none;
}

.form-container {
  margin-top: 10px;
}

.form-field {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #572364;
}

.botones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
