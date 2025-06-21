<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <h1 class="titulo">Crear Cuenta Productor</h1>

      <!-- Paso 1: Crear Usuario -->
      <div v-if="paso === 1" class="formulario">
        <pv-input-text
            v-model="username"
            placeholder="Nombre de usuario"
            class="campo-input"
        />
        <pv-password
            v-model="password"
            placeholder="Contraseña"
            toggleMask
            class="campo-input"
        />
        <pv-button label="Continuar" class="boton-login" @click="crearUsuario" />
      </div>

      <!-- Paso 2: Crear Productor -->
      <div v-else class="formulario">
        <pv-input-text v-model="productor.nombre" placeholder="Nombre completo" class="campo-input" />
        <pv-input-text v-model="productor.telefono" placeholder="Teléfono" class="campo-input" />
        <pv-input-text v-model="productor.email" placeholder="Email" class="campo-input" />
        <pv-input-text v-model="productor.direccion" placeholder="Dirección" class="campo-input" />
        <pv-input-text v-model="productor.ciudad" placeholder="Ciudad" class="campo-input" />
        <pv-input-text v-model="productor.pais" placeholder="País" class="campo-input" />
        <pv-input-text v-model="productor.url" placeholder="Sitio web (opcional)" class="campo-input" />
        <pv-button label="Registrar Productor" class="boton-login" @click="registrarProductor" />
      </div>

    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import ProductorService from "../services/productor.service";
import { ProductorEntity } from "../../Menu/model/productor.entity.js";

export default {
  data() {
    return {
      paso: 1,
      username: "",
      password: "",
      userIdCreado: null,
      productor: new ProductorEntity(), // El constructor debe evitar id = null
    };
  },
  methods: {
    async crearUsuario() {
      if (!this.username || !this.password) {
        alert("Complete todos los campos.");
        return;
      }

      try {
        const usuario = {
          username: this.username,
          password: this.password,
          rol: "1", // Productor
        };

        const response = await UserService.create(usuario);

        if (!response.data.id) {
          throw new Error("El backend no devolvió un ID válido.");
        }

        this.userIdCreado = response.data.id;
        this.productor.userid = this.userIdCreado;
        this.productor.fechaRegistro = new Date().toISOString();

        this.paso = 2;

      } catch (error) {
        console.error("Error al crear usuario:", error);
        alert("No se pudo crear el usuario.");
      }
    },

    async registrarProductor() {
      try {
        // Clonar el objeto y eliminar el campo `id` si está null o undefined
        const { id, ...productorFinal } = this.productor;

        productorFinal.fechaRegistro = new Date().toISOString();

        const response = await ProductorService.create(productorFinal);

        alert("¡Registro exitoso!");
        this.$router.push({ name: "MenuProductor", params: { id: this.userIdCreado } });

      } catch (error) {
        console.error("Error al registrar productor:", error);
        alert("No se pudo registrar el productor.");
      }
    }
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
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

.titulo {
  text-align: center;
  margin-bottom: 30px;
  color: #6a0dad;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.campo-input {
  width: 100%;
}

.boton-login {
  background-color: #6a0dad;
  border: none;
  color: white;
}
</style>
