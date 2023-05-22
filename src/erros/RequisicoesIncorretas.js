import ErroBase from "./ErroBase.js";

class RequisicoesIncorretas extends ErroBase {
    constructor() {
        super("Um ou mais DADOS estão INCORRETOS!", 400);
    }
} 

export default RequisicoesIncorretas;