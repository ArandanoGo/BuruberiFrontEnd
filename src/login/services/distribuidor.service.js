
import http from "../../shared/services/http-common.js";

export class DistribuidorService {
    // Punto de entrada a tu recurso “distribuidores” en el backend
    resourceEndpoint = "/distribuidores";

    /**
     * Obtiene todos los distribuidores.
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }
    /**
     * Obtiene un distribuidor por su ID
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea un nuevo distribuidor.
     * @param {Object} distribuidorObject  Objeto con los campos del distribuidor
     */
    create(distribuidorObject) {
        return http.post(this.resourceEndpoint, distribuidorObject);
    }

    /**
     * Actualiza un distribuidor existente.
     * @param {string|number} id
     * @param {Object} distribuidorObject  Objeto con los campos actualizados
     */
    update(id, distribuidorObject) {
        return http.put(`${this.resourceEndpoint}/${id}`, distribuidorObject);
    }

    /**
     * Elimina un distribuidor por su ID
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Busca distribuidores por nombre (si tu backend lo permite)
     * @param {string} nombre
     */
    findByNombre(nombre) {
        return http.get(`${this.resourceEndpoint}?nombre=${encodeURIComponent(nombre)}`);
    }

    /**
     * Busca distribuidores por ciudad (si tu backend lo permite)
     * @param {string} ciudad
     */
    findByCiudad(ciudad) {
        return http.get(`${this.resourceEndpoint}?ciudad=${encodeURIComponent(ciudad)}`);
    }
}

export default new DistribuidorService();
