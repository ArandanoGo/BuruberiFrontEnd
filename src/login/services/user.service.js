import http from "../../shared/services/http-common.js";

export class UserService {
    // Punto de entrada a tu recurso “usuarios” en el backend
    resourceEndpoint = "/users";

    /**
     * Obtiene todos los usuarios.
     */
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    /**
     * Obtiene un usuario por su ID
     * @param {string|number} id
     */
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Crea un nuevo usuario.
     * @param {Object} userObject Objeto con los campos del usuario
     */
    create(userObject) {
        return http.post(this.resourceEndpoint, userObject);
    }

    /**
     * Actualiza un usuario existente.
     * @param {string|number} id
     * @param {Object} userObject Objeto con los campos actualizados
     */
    update(id, userObject) {
        return http.put(`${this.resourceEndpoint}/${id}`, userObject);
    }

    /**
     * Elimina un usuario por su ID
     * @param {string|number} id
     */
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Busca usuarios por nombre de usuario (si tu backend lo permite)
     * @param {string} username
     */
    findByUsername(username) {
        return http.get(`${this.resourceEndpoint}?username=${encodeURIComponent(username)}`);
    }
}

export default new UserService();
