export class ContactoEntity {
    constructor({
                    id = null,
                    idDistribuidor = null,
                    idProductor = null,
                } = {}) {
        this.id = id;
        this.idDistribuidor = idDistribuidor;
        this.idProductor = idProductor;
    }
}