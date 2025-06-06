export class MensajeEntity {
    constructor({
                    id = null,
                    remitenteId = null,
                    destinatarioId = null,
                    contenido = "",
                    fechaEnvio = new Date(),
                    leido = false,
                } = {}) {
        this.id = id;
        this.remitenteId = remitenteId;       // ID del usuario que envía
        this.destinatarioId = destinatarioId; // ID del usuario que recibe
        this.contenido = contenido;
        this.fechaEnvio = new Date(fechaEnvio);
        this.leido = leido;                   // booleano opcional para marcar si fue leído
    }
}
