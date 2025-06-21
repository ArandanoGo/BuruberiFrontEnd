<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <h1 class="titulo">Crear Cuenta Distribuidor</h1>

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

      <!-- Paso 2: Crear Distribuidor -->
      <div v-else class="formulario">
        <pv-input-text v-model="distribuidor.nombre" placeholder="Nombre completo" class="campo-input" />
        <pv-input-text v-model="distribuidor.telefono" placeholder="Teléfono" class="campo-input" />
        <pv-input-text v-model="distribuidor.email" placeholder="Email" class="campo-input" />
        <pv-input-text v-model="distribuidor.direccion" placeholder="Dirección" class="campo-input" />
        <pv-input-text v-model="distribuidor.ciudad" placeholder="Ciudad" class="campo-input" />
        <pv-input-text v-model="distribuidor.pais" placeholder="País" class="campo-input" />
        <pv-input-text v-model="distribuidor.url" placeholder="Sitio web (opcional)" class="campo-input" />
        <pv-button label="Registrar Distribuidor" class="boton-login" @click="registrarDistribuidor" />
      </div>

    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import DistribuidorService from "../services/distribuidor.service";
import { DistribuidorEntity } from "../../Menu/model/distribuidor.entity.js";

export default {
  data() {
    return {
      paso: 1,
      username: "",
      password: "",
      userIdCreado: null,
      distribuidor: new DistribuidorEntity(),
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
          rol: "2",
        };

        console.log("Enviando usuario:", usuario);

        const response = await UserService.create(usuario);

        console.log("Respuesta backend:", response);

        if (!response.data.id) {
          throw new Error("El backend no devolvió un ID válido.");
        }

        this.userIdCreado = response.data.id;
        this.distribuidor.userid = this.userIdCreado;
        this.distribuidor.fechaRegistro = new Date().toISOString();

        this.paso = 2;

      } catch (error) {
        console.error("Error al crear usuario:", error);
        alert("No se pudo crear el usuario.");
      }
    },



    async registrarDistribuidor() {
      try {
        const { id, ...distribuidorFinal } = this.distribuidor;
        distribuidorFinal.fechaRegistro = new Date().toISOString();

        const response = await DistribuidorService.create(distribuidorFinal);

        const distribuidorIdCreado = response.data.id;

        alert("¡Registro exitoso!");
        this.$router.push({ name: "MenuDistribuidor", params: { id: distribuidorIdCreado } });

      } catch (error) {
        console.error("Error al registrar distribuidor:", error);
        alert("No se pudo registrar el distribuidor.");
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
