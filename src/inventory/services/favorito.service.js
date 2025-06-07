// src/services/favorito.service.js

import http from "../../shared/services/http-common.js";

export class FavoritoService {
    // Punto de entrada a tu recurso “favoritos” en el backend
    resourceEndpoint = "/favoritos";

    /**
     * Obtiene todos los favoritos
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    /**
     * Obtiene un favorito por su ID
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea un nuevo favorito
     * @param {Object} favoritoObject  Objeto con los campos del favorito (idLote, etc.)
     */
    create(favoritoObject) {
        return http.post(this.resourceEndpoint, favoritoObject);
    }

    /**
     * Elimina un favorito por su ID
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Obtiene un favorito a partir del ID del lote
     * (Ajusta esto según la ruta real de tu backend, por ejemplo /favoritos/lote/123)
     * @param {string|number} idLote
     */
    getByIdLote(idLote) {
        return http.get(`${this.resourceEndpoint}/lote/${idLote}`);
    }
}

export default new FavoritoService();
