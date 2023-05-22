import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livros} from "../models/index.js";

class livroController {
    static listarLivros = async (req, res, next) => {
        try {
            const todosLivros = await livros.find()
                .populate("autor", "nome")
                .exec();

            res.status(200).send(todosLivros);
        } catch (err) {
            next(err);
        }
    };

    static listarLivrosPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livro = await livros.findById(id)
                .populate("autor", "nome")
                .exec();
            
            if (livro !== null) {
                res.status(200).send(livro);
            } else {
                next(new NaoEncontrado("Livro não encontrado"));
            }
        } catch (err) {
            next(err);
        }

    };

    static listaLivrosPorEditora = async (req, res, next) => {
        try{
            const editora = req.query.editora;
            const livro = await livros.find({"editora": editora}, {});
            
            if (livro !== null) {
                res.status(200).send(livro);
            } else {
                next(new NaoEncontrado("Livro não encontrado"));
            }
        } catch (err) {
            next(err);
        }
    };

    static cadastrarLivros = async (req, res, next) => {
        try {
            let livro = new livros(req.body);
            const livroCadastrado = await livro.save();
            
            res.status(201).send(livroCadastrado.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static atualizarLivros = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroAtualizado = await livros.findByIdAndUpdate(id, {$set: req.body});

            if (livroAtualizado !== null) {
                res.status(200).send({message: `LIVRO ATUALIZADO COM SUCESSO ${livroAtualizado}`});
            } else {
                next(new NaoEncontrado("Livro não encontrado"));
            }
        } catch (err) {
            next(err);
        }
    };
    

    static excluirLivros = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroExcluido = await livros.findByIdAndDelete(id);
            
            if (livroExcluido !== null) {
                res.status(200).send(`Livro EXCLUIDO com SUCESSO ${livroExcluido}`);
            } else {
                next(new NaoEncontrado("Livro não encontrado para sua exclusão."));
            }
        } catch (err) {
            next(err);
        }
    };
}

export default livroController;