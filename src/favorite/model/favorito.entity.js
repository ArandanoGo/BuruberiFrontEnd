export class FavoritoEntity {
    constructor({
                    id = null,
                    idLote = null,
                    idDistribuidor = null,
                } = {}) {
        this.id = id;
        this.idLote = idLote;
        this.idDistribuidor = idDistribuidor;
    }
}
