// src/services/contacto.service.js

import http from "../../shared/services/http-common.js";

export class ContactoService {
    // Punto de entrada a tu recurso “contactos” en el backend
    resourceEndpoint = "/contactos";

    /**
     * Obtiene todos los contactos.
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    /**
     * Obtiene un contacto por su ID
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea un nuevo contacto en el backend.
     * @param {Object} contactoObject  Objeto con los campos del contacto
     */
    create(contactoObject) {
        return http.post(this.resourceEndpoint, contactoObject);
    }

    /**
     * Actualiza un contacto existente.
     * @param {string|number} id
     * @param {Object} contactoObject  Objeto con los campos actualizados del contacto
     */
    update(id, contactoObject) {
        return http.put(`${this.resourceEndpoint}/${id}`, contactoObject);
    }

    /**
     * Elimina un contacto por su ID
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Busca contactos por idDistribuidor
     * @param {string|number} idDistribuidor
     */
    findByDistribuidor(idDistribuidor) {
        return http.get(`${this.resourceEndpoint}?idDistribuidor=${encodeURIComponent(idDistribuidor)}`);
    }

    /**
     * Busca contactos por idProductor
     * @param {string|number} idProductor
     */
    findByProductor(idProductor) {
        return http.get(`${this.resourceEndpoint}?idProductor=${encodeURIComponent(idProductor)}`);
    }
}

export default new ContactoService();
