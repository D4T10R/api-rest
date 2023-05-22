import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {
            type: String, 
            required: [true, "O titulo do livro é obrigatorio"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "autor", 
            required: [true, "Autor do livro é obrigatorio"]
        },
        editora: {
            type: String, 
            required: [true, "Editora é obrigatoria"]
        },
        numeroPaginas: {type: Number},
    }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;