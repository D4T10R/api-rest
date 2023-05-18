import AutorModel from "../models/autor.js";

class AutorController {
    static listarAutor = (req, res) => {
        AutorModel.find((err, autor) => {
            res.status(200).json(autor);
        });
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;
        AutorModel.findById(id, (err, autor) => {
            if (!err) {
                res.status(200).send(autor);
            } else {
                res.status(400).send({ message: "autor NÃO encontrado" });
            }
        });
    }

    static cadastrarAutor = (req, res) => {
        let novoAutor = new AutorModel(req.body);

        novoAutor.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} Servidor não conseguiu processar` });
            } else {
                res.status(201).send(novoAutor.toJSON());
            }
        });
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;
        AutorModel.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'autor ATUALIZADO COM SUCESSO' });
            } else {
                res.status(500).send({ message: 'autor NÃO foi atualizado: ' + err.message });
            }
        });
    }

    static excluirAutor = (req, res) => {
        const id = req.params.id;

        AutorModel.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send("autor EXCLUIDO com SUCESSO");
            } else {
                res.status(500).send('autor NÃO foi excluido');
            }
        });
    }
}

export default AutorController;