class ErroBase extends Error {
    constructor(messagem = "Erro interno do Servidor", status = 500) {
        super();
        this.message = messagem;
        this.status = status;
    }

    enviarResposta(res) {
        res.status(this.status).send({
            message: this.message,
            status: this.status
        });
    }
}

export default ErroBase;