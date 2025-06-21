<template>
  <div class="fondo-morado">
    <div class="card-contenedor">

      <pv-button icon="pi pi-arrow-left" class="p-button-text flecha-volver" @click="volverAtras" />

      <h1 class="titulo">Inicio de Sesión</h1>

      <!-- Formulario de login -->
      <div class="formulario-login">
        <pv-input-text v-model="username" placeholder="Nombre de usuario" class="campo-input" />
        <pv-password v-model="password" placeholder="Contraseña" toggleMask class="campo-input" />
        <pv-button label="Ingresar" class="boton-login" @click="login" />
      </div>

      <!-- Acciones adicionales -->
      <div class="acciones-secundarias">
        <pv-button label="Crear cuenta nueva" class="p-button-text" @click="mostrarDialogo = true" />
        <pv-button label="Recuperar contraseña" class="p-button-text" @click="recuperarPassword" />
      </div>
    </div>

    <!-- Diálogo para elegir tipo de cuenta -->
    <pv-dialog v-model:visible="mostrarDialogo" modal header="Selecciona el tipo de cuenta" :style="{ width: '400px' }">
      <div class="tipo-cuenta-selector">
        <pv-radio-button id="prod" name="rol" value="1" v-model="rolSeleccionado" />
        <label for="prod">Cuenta Productor</label>

        <pv-radio-button id="dist" name="rol" value="2" v-model="rolSeleccionado" class="ml-4" />
        <label for="dist">Cuenta Distribuidor</label>
      </div>

      <template #footer>
        <pv-button label="Cancelar" class="p-button-text" @click="mostrarDialogo = false" />
        <pv-button label="Continuar" :disabled="!rolSeleccionado" @click="continuarRegistro" />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
import UserService from "../services/user.service.js";
import { UserEntity } from "../model/user.entity.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      mostrarDialogo: false,
      rolSeleccionado: null
    };
  },
  methods: {
    volverAtras() {
      this.$router.go(-1);
    },

    async login() {
      if (!this.username || !this.password) {
        alert("Por favor, complete ambos campos.");
        return;
      }

      try {
        const response = await UserService.getAll();
        const usuarioEncontrado = response.data.find(u =>
            u.username === this.username && u.password === this.password
        );

        if (!usuarioEncontrado) {
          alert("Usuario o contraseña incorrectos");
          return;
        }

        const usuario = new UserEntity(usuarioEncontrado);

        switch (usuario.rol) {
          case "1":
            this.$router.push({ name: "MenuProductor", params: { id: usuario.id } });
            break;
          case "2":
            this.$router.push({ name: "MenuDistribuidor", params: { id: usuario.id } });
            break;
          default:
            alert("Rol de usuario no reconocido");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error durante el inicio de sesión.");
      }
    },

    recuperarPassword() {
      this.$router.push({ name: "PasswordRecovery" });
    },

    continuarRegistro() {
      this.mostrarDialogo = false;

      if (this.rolSeleccionado === "1") {
        this.$router.push({ name: "login-Productor" });
      } else if (this.rolSeleccionado === "2") {
        this.$router.push({ name: "login-Distribuidor" });
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

.formulario-login {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 20px;
}

.campo-input {
  width: 100%;
}

.boton-login {
  background-color: #6a0dad;
  border: none;
  color: white;
}

.acciones-secundarias {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.tipo-cuenta-selector {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>
