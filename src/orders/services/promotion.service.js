// src/services/promotion.service.js

import http from "../../shared/services/http-common.js";

export class PromotionService {
    // Punto de entrada a tu recurso “promociones” en el backend
    resourceEndpoint = "/promotions";

    /**
     * Obtiene todas las promociones.
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    /**
     * Obtiene una promoción por su ID.
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea una nueva promoción.
     * @param {Object} promotionObject Objeto con los campos de la promoción
     */
    create(promotionObject) {
        return http.post(this.resourceEndpoint, promotionObject);
    }

    /**
     * Actualiza una promoción existente.
     * @param {string|number} id
     * @param {Object} promotionObject Objeto con los campos actualizados
     */
    update(id, promotionObject) {
        return http.put(`${this.resourceEndpoint}/${id}`, promotionObject);
    }

    /**
     * Elimina una promoción por su ID.
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Busca promociones por código.
     * @param {string} codigo
     */
    findByCodigo(codigo) {
        return http.get(`${this.resourceEndpoint}?codigo=${encodeURIComponent(codigo)}`);
    }

    /**
     * Busca promociones por ID del productor.
     * @param {string|number} IdProductor
     */
    findByProductor(IdProductor) {
        return http.get(`${this.resourceEndpoint}?IdProductor=${encodeURIComponent(IdProductor)}`);
    }
}

export default new PromotionService();
