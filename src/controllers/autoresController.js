import mongoose from "mongoose";
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

    static listarAutorPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const autorResultado = await AutorModel.findById(id);

            if(autorResultado !== null) {
                res.status(200).send(autorResultado);
            } else {
                res.status(404).send({ message: "autor NÃO encontrado" });
            }

        } catch (err) {
            if(err instanceof mongoose.Error.CastError) {
                res.status(400).send({messagem: "ERRO, id solicitado é inválido"});
            } else {
                res.status(500).send({ message: "ERRO no SERVIDOR" });
            }
        }
    };

    static cadastrarAutor = async (req, res) => {
        try {
            let novoAutor = new AutorModel(req.body);
            const autorCriado = await novoAutor.save();
            res.status(201).send(autorCriado.toJSON());
        } catch (err) {
            res.status(500).send({ message: `${err.message} Servidor não conseguiu processar` });
        }
    };

    static atualizarAutor = async (req, res) => {
        try{
            const id = req.params.id;
            const autorAtualizado = await AutorModel.findByIdUpdate(id, {$set: req.body});
            res.status(200).send({ message: `autor ATUALIZADO COM SUCESSO ${autorAtualizado.json}` });
        } catch (err) {
            res.status(500).send({ message: "autor NÃO foi atualizado: " + err.message });
        }

    };

    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id;
            const autorDeletado = await AutorModel.findByIdAndDelete(id);
            res.status(200).send(`autor EXCLUIDO com SUCESSO ${autorDeletado}`);
        } catch (err) {
            res.status(500).send("autor NÃO foi excluido");
        }
    };
}

export default AutorController;