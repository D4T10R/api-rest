import NaoEncontrado from "../erros/NaoEncontrado.js";
import AutorModel from "../models/autor.js";

class AutorController {
    static listarAutor = async (req, res) => {
        try {
            const autoresResultados = await AutorModel.find();
            res.status(200).json(autoresResultados);
        } catch (err) {
            res.status(500).json({message: "ERRO interno no SERVIDOR"});
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await AutorModel.findById(id);

            if(autorResultado !== null) {
                res.status(200).send(autorResultado);
            } else {
                next(new NaoEncontrado("Id do autor não localizado"));
            }

        } catch (err) {
            next(err);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            let novoAutor = new AutorModel(req.body);
            const autorCriado = await novoAutor.save();
            res.status(201).send(autorCriado.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try{
            const id = req.params.id;
            const autorAtualizado = await AutorModel.findByIdUpdate(id, {$set: req.body});
            res.status(200).send({ message: `autor ATUALIZADO COM SUCESSO ${autorAtualizado.json}` });
        } catch (err) {
            next(err);
        }

    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorDeletado = await AutorModel.findByIdAndDelete(id);
            res.status(200).send(`autor EXCLUIDO com SUCESSO ${autorDeletado}`);
        } catch (err) {
            next(err);
        }
    };
}

export default AutorController;