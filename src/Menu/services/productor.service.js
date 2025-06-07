// src/services/productor.service.js

import http from "../../shared/services/http-common.js";

export class ProductorService {
    // Punto de entrada a tu recurso “productores” en el backend
    resourceEndpoint = "/productores";

    /**
     * Obtiene todos los productores.
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    /**
     * Obtiene un productor por su ID
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea un nuevo productor.
     * @param {Object} productorObject  Objeto con los campos del productor
     */
    create(productorObject) {
        return http.post(this.resourceEndpoint, productorObject);
    }

    /**
     * Actualiza un productor existente.
     * @param {string|number} id
     * @param {Object} productorObject  Objeto con los campos actualizados
     */
    update(id, productorObject) {
        return http.put(`${this.resourceEndpoint}/${id}`, productorObject);
    }

    /**
     * Elimina un productor por su ID
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Busca productores por nombre
     * @param {string} nombre
     */
    findByNombre(nombre) {
        return http.get(`${this.resourceEndpoint}?nombre=${encodeURIComponent(nombre)}`);
    }

    /**
     * Busca productores por ciudad
     * @param {string} ciudad
     */
    findByCiudad(ciudad) {
        return http.get(`${this.resourceEndpoint}?ciudad=${encodeURIComponent(ciudad)}`);
    }
}

export default new ProductorService();
