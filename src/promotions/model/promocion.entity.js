export class PromotionEntity {
    constructor({
                    id = null,
                    IdProductor = null,
                    codigo= null,
                    descuento = null,
                } = {}) {
        this.id = id;
        this.IdProductor = IdProductor;
        this.codigo = codigo;
        this.descuento = descuento;
    }
}
