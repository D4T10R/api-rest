import RequisicoesIncorretas from "../erros/RequisicoesIncorretas.js";

async function paginar(req, res, next) {
    try {
        const { limite = 3, pagina = 1, ordenacao = "_id:-1" } = req.query;
    
        const [campoOrdenacao, ordem] = ordenacao.split(":"); 
        
        const resultado = req.resultado;

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado.find()
                .sort({ [campoOrdenacao]: ordem})
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec();
                
            res.status(200).send(resultadoPaginado);
        } else {
            next(new RequisicoesIncorretas());
        }
    } catch (err) {
        next(err);
    }
}

export default paginar;