import RequisicoesIncorretas from "./RequisicoesIncorretas.js";

class ErroValidacao extends RequisicoesIncorretas {
    constructor(erro){
        const mensagemErro = erro.message;
        super(`ERRO: ${mensagemErro}`);
    }
}

export default ErroValidacao;
