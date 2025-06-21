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
              <!-- Solo mostrar avatar si es mensaje recibido del productor -->
              <img
                  v-if="msg.remitenteId !== usuarioActual.id && msg.avatar"
                  :src="msg.avatar"
                  alt="Avatar del productor"
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
          <input
              v-model="nuevoMensaje"
              @keyup.enter="enviarMensaje"
              placeholder="Escribe un mensaje..."
          />
          <pv-button label="Enviar" icon="pi pi-send" @click="enviarMensaje" />
        </div>
      </div>

      <!-- Placeholder si no hay contacto seleccionado -->
      <div class="chat-placeholder" v-else>
        <p>Selecciona un contacto para comenzar a chatear.</p>
      </div>
    </div>
  </div>
</template>

<script>
import MensajeService from "../services/mensaje.service.js";
import ContactoService from "../services/contacto.service.js";
import ProductorService from "../services/productor.service.js";

export default {
  props: ['id'],  // Recibe id distribuidor desde la ruta
  data() {
    return {
      mensajes: [],
      nuevoMensaje: "",
      usuarioActual: { id: this.id || "1005", nombre: "Gustavo" }, // Usa id de prop o default
      contactos: [],
      contactoSeleccionado: null,
      pollingInterval: null,
    };
  },
  watch: {
    // Si cambia la prop id (distribuidor), actualiza usuarioActual y recarga datos
    id(newId) {
      this.usuarioActual.id = newId;
      this.contactos = [];
      this.mensajes = [];
      this.contactoSeleccionado = null;
      this.fetchContactos();
      this.fetchMensajes();
    },
  },
  computed: {
    mensajesFiltrados() {
      if (!this.contactoSeleccionado) return [];
      return this.mensajes.filter(
          (msg) =>
              (msg.remitenteId === this.usuarioActual.id &&
                  msg.destinatarioId === this.contactoSeleccionado.id) ||
              (msg.remitenteId === this.contactoSeleccionado.id &&
                  msg.destinatarioId === this.usuarioActual.id)
      );
    },
  },
  methods: {
    async fetchMensajes() {
      try {
        const response = await MensajeService.getAll();
        const mensajes = response.data;

        this.mensajes = mensajes.map((msg) => {
          const contacto = this.contactos.find((c) => c.id === msg.remitenteId);
          return {
            ...msg,
            avatar:
                msg.remitenteId !== this.usuarioActual.id
                    ? contacto?.url || ""
                    : null,
          };
        });

        this.scrollChatToBottom();
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    },

    async fetchContactos() {
      try {
        const response = await ContactoService.findByDistribuidor(
            this.usuarioActual.id
        );
        const contactosBase = response.data;

        const contactosConNombre = await Promise.all(
            contactosBase.map(async (c) => {
              try {
                const productorResp = await ProductorService.getById(c.idProductor);
                const productor = productorResp.data;
                return {
                  id: c.idProductor,
                  nombre: productor.nombre || `Productor ${c.idProductor}`,
                  url: productor.url || "",
                };
              } catch (err) {
                console.warn(`No se pudo obtener nombre para productor ${c.idProductor}`);
                return {
                  id: c.idProductor,
                  nombre: `Productor ${c.idProductor}`,
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
    this.fetchContactos();
    this.fetchMensajes();
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
  display: flex;
  align-items: flex-start;
}

.chat-message.sent {
  margin-left: auto;
  flex-direction: row-reverse;
  text-align: right;
}

.chat-message.received {
  margin-right: auto;
  flex-direction: row;
  text-align: left;
}

.mensaje-con-avatar {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.contenido-mensaje {
  background-color: #d1e7dd;
  padding: 0.75rem;
  border-radius: 8px;
  color: black;
}

.chat-message.received .contenido-mensaje {
  background-color: #f8d7da;
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
