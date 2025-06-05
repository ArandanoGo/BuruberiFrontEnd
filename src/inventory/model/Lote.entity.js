export class LoteEntity {
    constructor({
                    id = null,
                    autor = "",
                    hora = "",
                    materiaOrganica = 0,
                    cloruroPotasio = 0,
                    fosfato = 0,
                    sulfatoCalcio = 0,
                    urea = 0,
                    sulfatoMagnesio = 0,
                    correctoresPH = 0,
                    idProductor = null,
                    tipo = "",
                    precioUnitario = 0,
                    pesoKg = 0,
                    calidad = "",
                    estado = "",
                    stock = 0,
                    fechaPedido = null, // Se establecerá cuando se haga el pedido
                } = {}) {
        this.id = id;
        this.autor = autor;
        this.fechaRegistro = new Date(); // Se genera automáticamente al crear la instancia
        this.hora = hora;
        this.materiaOrganica = materiaOrganica;
        this.cloruroPotasio = cloruroPotasio;
        this.fosfato = fosfato;
        this.sulfatoCalcio = sulfatoCalcio;
        this.urea = urea;
        this.sulfatoMagnesio = sulfatoMagnesio;
        this.correctoresPH = correctoresPH;
        this.idProductor = idProductor;
        this.tipo = tipo;
        this.precioUnitario = precioUnitario;
        this.pesoKg = pesoKg;
        this.calidad = calidad;
        this.estado = estado;
        this.stock = stock;
        this.fechaPedido = fechaPedido ? new Date(fechaPedido) : null;
    }
}
