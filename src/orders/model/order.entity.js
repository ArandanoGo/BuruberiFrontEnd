export class OrderEntity {
    constructor({
                    id = null,
                    idDistribuidor = null,
                    idLote = null,
                    fechaPedido = null,
                    cantidad = null,
                    estado = "Pendiente",
                    precioFinal = null  // 👈 nuevo campo agregado
                } = {}) {
        this.id = id;
        this.idDistribuidor = idDistribuidor;
        this.idLote = idLote;
        this.fechaPedido = fechaPedido ? new Date(fechaPedido) : new Date();
        this.cantidad = cantidad;
        this.estado = estado;
        this.precioFinal = precioFinal; // 👈 asignación del nuevo campo
    }
}
