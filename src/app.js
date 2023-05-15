import express, { json } from "express";

const app = express();

app.use(express.json()) // para transformar o que chegou em POST ou PUT em JSON


const livros = [
    {id: 1, "titulo": "senhor dos aneis"},
    {id: 2, "titulo": "O Hobbit"}
]

app.get('/', (req, res) => {
    res.status(200).send('Tudo aconteceu corretamente, Curso de node')
})

app.get('/livros', (req, res) => {
    res.status(200).json(livros)
})

app.get('/livros/:id', (req, res) => {
    let index = buscaLivros(req.params.id)
    res.send(livros[index])
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com SUCESSO!');
})

app.put('/livros/:id', (req, res) => {
    let index = buscaLivros(req.params.id);
    if (index >= 0) {
        livros[index].titulo = req.body.titulo;
        res.send('tudo ok');
    } else {
        res.status(404).send('Livro não encontrado');
    }
})

app.delete('/livros/:id', (req, res) => {
    let index = buscaLivros(req.params.id)
    livros.splice(index, 1)
    res.send("Livro deletado com SUCESSO")
})

function buscaLivros(id) {
    return livros.findIndex(livro => livro.id == id)
}

export default app