// src/services/mensaje.service.js

import http from "../../shared/services/http-common.js";

export class MensajeService {
    // Punto de entrada a tu recurso “mensajes” en el backend
    resourceEndpoint = "/mensajes";

    /**
     * Obtiene todos los mensajes (opcional, no siempre necesario).
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    /**
     * Obtiene un mensaje por su ID.
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea un nuevo mensaje en el backend.
     * @param {Object} mensajeObject Objeto con campos como:
     *  - remitenteId
     *  - destinatarioId
     *  - contenido
     */
    create(mensajeObject) {
        return http.post(this.resourceEndpoint, mensajeObject);
    }

    /**
     * Actualiza un mensaje (ej. marcar como leído).
     * @param {string|number} id
     * @param {Object} mensajeObject
     */
    update(id, mensajeObject) {
        return http.put(`${this.resourceEndpoint}/${id}`, mensajeObject);
    }

    /**
     * Elimina un mensaje por su ID.
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Obtiene todos los mensajes entre dos usuarios.
     * @param {number} remitenteId
     * @param {number} destinatarioId
     */
    getConversacion(remitenteId, destinatarioId) {
        return http.get(`${this.resourceEndpoint}/conversacion`, {
            params: {
                remitenteId,
                destinatarioId,
            },
        });
    }

    /**
     * Puedes agregar más filtros personalizados si tu backend los soporta.
     */
}

export default new MensajeService();
