export class PromotionEntity {
    constructor({
                    id = null,
                    IdProductor = null,
                    codigo= null,
                    descuento = null,
                    fecha_caducidad = null,
                } = {}) {
        this.id = id;
        this.IdProductor = IdProductor;
        this.codigo = codigo;
        this.descuento = descuento;
        this.fecha_caducidade = fecha_caducidad;
    }
}
