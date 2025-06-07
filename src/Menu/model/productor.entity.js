export class ProductorEntity {
    constructor({
                    id = null,
                    nombre = "",
                    telefono = "",
                    email = "",
                    direccion = "",
                    ciudad = "",
                    pais = "",
                    fechaRegistro = null,
                    url = null,
                } = {}) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.fechaRegistro = fechaRegistro ? new Date(fechaRegistro) : null;
        this.url = url;
    }
}
