import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class livroController {
    static listarLivros = async (req, res, next) => {
        try {
            const buscaLivros = livros.find();
            req.resultado = buscaLivros;
            next();
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

    static listaLivrosPorFiltro = async (req, res, next) => {
        try{
            const busca = await processaBusca(req.query);

            if (busca != null) {
                const livrosResultado = livros
                    .find(busca)
                    .populate("autor");
                
                req.resultado = livrosResultado;

                next();
            } else {
                res.status(200).send([]);
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

async function processaBusca(parametros) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = {$regex: titulo, $option: "i"};

    if (minPaginas) busca.numeroPaginas = { $gte: minPaginas };
    if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });

        if (autor != null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }


    return busca;
}

export default livroController;