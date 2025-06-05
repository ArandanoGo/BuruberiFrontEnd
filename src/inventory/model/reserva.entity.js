export class ReservaEntity {
    constructor({
                    id = null,
                    idDistribuidor = null,
                    idLote = null,
                    fechaRegistro = null,
                    stock = 0,
                    estado = "Pendiente",
                } = {}) {
        this.id = id;
        this.idDistribuidor = idDistribuidor;
        this.idLote = idLote;
        this.fechaRegistro = fechaRegistro ? new Date(fechaRegistro) : new Date();
        this.stock = stock;
        this.estado = estado;
    }
}
