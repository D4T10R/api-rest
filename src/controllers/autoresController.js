import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {
    static listarAutor = async (req, res, next) => {
        try {
            const autoresResultados = autores.find();
            req.resultado = autoresResultados;
            next();
        } catch (err) {
            res.status(500).json({message: "ERRO interno no SERVIDOR"});
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autores.findById(id);

            if(autorResultado !== null) {
                res.status(200).send(autorResultado);
            } else {
                next(new NaoEncontrado("Id do autor não"));
            }

        } catch (err) {
            next(err);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let novoAutor = new autores(req.body);
            const autorCriado = await novoAutor.save();
            res.status(201).send(autorCriado.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try{
            const id = req.params.id;
            const autorAtualizado = await autores.findByIdUpdate(id, {$set: req.body});
            if (autorAtualizado !== null) {
                res.status(200).send({ message: `autor ATUALIZADO COM SUCESSO ${autorAtualizado.json}` });
            } else {
                next(new NaoEncontrado("Autor não encontrado para atualização!"));
            }
        } catch (err) {
            next(err);
        }

    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorDeletado = await autores.findByIdAndDelete(id);
            if (autorDeletado !== null) {
                res.status(200).send(`autor EXCLUIDO com SUCESSO ${autorDeletado}`);
            } else [
                next(new NaoEncontrado("Autor não encontrado"))
            ];
        } catch (err) {
            next(err);
        }
    };
}

export default AutorController;