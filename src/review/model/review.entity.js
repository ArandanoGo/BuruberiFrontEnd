export class Review {
    constructor( {
                     puntuacion = 0,
                     comentario = "",
                     loteId = ""
                 })
    {
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.loteId = loteId;
    }
}