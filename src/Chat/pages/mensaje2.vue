<template>
  <div class="fondo-morado">
    <div class="messenger-container">
      <!-- Lista de contactos -->
      <div class="contactos">
        <h3>Contactos</h3>
        <ul>
          <li
              v-for="contacto in contactos"
              :key="contacto.id"
              @click="seleccionarContacto(contacto)"
              :class="{ activo: contacto.id === contactoSeleccionado?.id }"
          >
            {{ contacto.nombre }}
          </li>
        </ul>
      </div>

      <!-- Chat seleccionado -->
      <div class="chat-container" v-if="contactoSeleccionado">
        <div class="chat-header">
          <h2 class="titulo">Chat con {{ contactoSeleccionado.nombre }}</h2>
        </div>

        <div class="chat-messages" ref="chatMessages">
          <div
              v-for="msg in mensajesFiltrados"
              :key="msg.id"
              :class="['chat-message', msg.remitenteId === usuarioActual.id ? 'sent' : 'received']"
          >
            <div class="mensaje-con-avatar">
              <!-- Mostrar avatar solo para mensajes recibidos -->
              <img
                  v-if="msg.remitenteId !== usuarioActual.id && msg.avatar"
                  :src="msg.avatar"
                  alt="Avatar del distribuidor"
                  class="avatar"
              />
              <div class="contenido-mensaje">
                <p class="contenido">{{ msg.contenido }}</p>
                <small class="fecha">{{ new Date(msg.fechaEnvio).toLocaleString() }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input v-model="nuevoMensaje" @keyup.enter="enviarMensaje" placeholder="Escribe un mensaje..." />
          <pv-button label="Enviar" icon="pi pi-send" @click="enviarMensaje" />
        </div>
      </div>

      <!-- Si no hay contacto seleccionado -->
      <div class="chat-placeholder" v-else>
        <p>Selecciona un contacto para comenzar a chatear.</p>
      </div>
    </div>
  </div>
</template>

<script>
import MensajeService from "../services/mensaje.service.js";
import ContactoService from "../services/contacto.service.js";
import DistribuidorService from "../services/distribuidor.service.js";

export default {
  data() {
    return {
      mensajes: [],
      nuevoMensaje: "",
      usuarioActual: { id: "10005", nombre: "Angelo" },
      contactos: [],
      contactoSeleccionado: null,
      pollingInterval: null,
    };
  },
  computed: {
    mensajesFiltrados() {
      if (!this.contactoSeleccionado) return [];
      return this.mensajes.filter(
          (msg) =>
              (msg.remitenteId === this.usuarioActual.id && msg.destinatarioId === this.contactoSeleccionado.id) ||
              (msg.remitenteId === this.contactoSeleccionado.id && msg.destinatarioId === this.usuarioActual.id)
      );
    },
  },
  methods: {
    async fetchMensajes() {
      try {
        const response = await MensajeService.getAll();
        const mensajes = response.data;

        // Agregar avatar a mensajes recibidos del distribuidor
        this.mensajes = mensajes.map((msg) => {
          const contacto = this.contactos.find((c) => c.id === msg.remitenteId);
          return {
            ...msg,
            avatar: msg.remitenteId !== this.usuarioActual.id ? contacto?.url || "" : null,
          };
        });

        this.scrollChatToBottom();
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    },

    async fetchContactos() {
      try {
        const response = await ContactoService.findByProductor(this.usuarioActual.id);
        const contactosBase = response.data;

        // Obtener nombre y url (avatar) del distribuidor
        const contactosConNombre = await Promise.all(
            contactosBase.map(async (c) => {
              try {
                const distResp = await DistribuidorService.getById(c.idDistribuidor);
                const distribuidor = distResp.data;
                return {
                  id: c.idDistribuidor,
                  nombre: distribuidor.nombre || `Distribuidor ${c.idDistribuidor}`,
                  url: distribuidor.url || "", // Asegúrate que el distribuidor tenga un campo url con la imagen
                };
              } catch (err) {
                console.warn(`No se pudo obtener nombre para distribuidor ${c.idDistribuidor}`);
                return {
                  id: c.idDistribuidor,
                  nombre: `Distribuidor ${c.idDistribuidor}`,
                  url: "",
                };
              }
            })
        );

        this.contactos = contactosConNombre;
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    },

    seleccionarContacto(contacto) {
      this.contactoSeleccionado = contacto;
      this.scrollChatToBottom();
    },

    async enviarMensaje() {
      if (!this.nuevoMensaje.trim() || !this.contactoSeleccionado) return;

      const mensaje = {
        id: Date.now().toString(),
        remitenteId: this.usuarioActual.id,
        remitenteNombre: this.usuarioActual.nombre,
        destinatarioId: this.contactoSeleccionado.id,
        destinatarioNombre: this.contactoSeleccionado.nombre,
        contenido: this.nuevoMensaje,
        fechaEnvio: new Date().toISOString(),
      };

      try {
        await MensajeService.create(mensaje);
        this.nuevoMensaje = "";
        await this.fetchMensajes();
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
        alert("No se pudo enviar el mensaje.");
      }
    },

    scrollChatToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatMessages;
        if (container) container.scrollTop = container.scrollHeight;
      });
    },
  },

  mounted() {
    this.fetchContactos().then(() => {
      this.fetchMensajes();
    });
    this.pollingInterval = setInterval(this.fetchMensajes, 3000);
  },

  beforeUnmount() {
    clearInterval(this.pollingInterval);
  },
};
</script>

<style scoped>
.fondo-morado {
  background-color: #572364;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.messenger-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 85vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.contactos {
  width: 250px;
  background-color: #f3f3f3;
  border-right: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
}

.contactos ul {
  list-style: none;
  padding: 0;
}

.contactos li {
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 8px;
  color: #333;
}

.contactos li.activo,
.contactos li:hover {
  background-color: #ddd;
}

.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: black;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  background-color: #fafafa;
  text-align: center;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f9f9f9;
}

.chat-message {
  margin-bottom: 1rem;
  max-width: 70%;
  font-size: 0.9rem;
  word-wrap: break-word;
  color: black;
}

/* Contenedor flex para avatar + mensaje */
.mensaje-con-avatar {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

/* Avatar */
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

/* Mensajes recibidos */
.chat-message.received {
  background-color: transparent; /* quitamos bg para manejarlo en contenido-mensaje */
  margin-right: auto;
  text-align: left;
}

/* Fondo y estilo del contenido del mensaje recibido */
.chat-message.received .contenido-mensaje {
  background-color: #f8d7da;
  border-radius: 8px;
  padding: 0.75rem;
  flex-grow: 1;
  color: black;
}

/* Mensajes enviados */
.chat-message.sent {
  background-color: transparent; /* quitamos bg para manejarlo en contenido-mensaje */
  margin-left: auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

/* Contenedor del mensaje enviado */
.chat-message.sent .mensaje-con-avatar {
  display: inline-block;
  flex-grow: 0;
}

/* Fondo y estilo del contenido del mensaje enviado */
.chat-message.sent .contenido-mensaje {
  background-color: #d1e7dd;
  border-radius: 8px;
  padding: 0.75rem;
  color: black;
}

.fecha {
  font-size: 0.7rem;
  color: #333;
  margin-top: 0.2rem;
}

.chat-input {
  padding: 1rem;
  border-top: 1px solid #ccc;
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
  color: black;
}

.chat-placeholder {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #555;
}

.contactos h3 {
  color: #6a0dad;
}


</style>
