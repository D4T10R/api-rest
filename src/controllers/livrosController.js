import livros from "../models/livros.js";

class livroController {
    static listarLivros = (req, res) => {
        livros.find((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static listarLivrosPorId = (req, res) => {
        const id = req.params.id
        livros.findById(id, (err, livro) => {
            if (!err) {
                res.status(200).send(livro)
            } else {
                res.status(400).send({message: "livro NÃO encontrado"})
            }
        })
    }

    static cadastrarLivros = (req, res) => {
        let livro = new livros(req.body)

        livro.save((err) => {
            if (err) {
                res.status(500).send({message: `${err.message} Servidor não conseguiu processar`})
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarLivros = (req, res) => {
        const id = req.params.id
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: 'LIVRO ATUALIZADO COM SUCESSO'})
            } else {
                res.status(500).send({messagem: 'Livro NÃO foi atualizado: ' + err.message})
            }
        })
    }

    static excluirLivros = (req, res) => {
        const id = req.params.id

        livros.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send("Livro EXCLUIDO com SUCESSO")
            } else {
                res.status(500).send('Livro NÃO foi excluido')
            }
        })
    }
}

export default livroController