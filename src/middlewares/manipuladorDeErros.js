import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicoesIncorretas from "../erros/RequisicoesIncorretas.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipularErros (erro, req, res, next) {
    if(erro instanceof mongoose.Error.CastError) {
        new RequisicoesIncorretas().enviarResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    } else if (erro instanceof NaoEncontrado) {
        erro.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    }
    res.status(500).send({message: "ERRO interno do servidos"});
}

export default manipularErros;