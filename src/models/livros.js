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
            required: [true, "Autor do livro é obrigatorio"],
            enum: {
                values: ["Casa do codigo", "Alura"],
                message: "Editora fornecida está incorretas"
            }
        },
        editora: {
            type: String, 
            required: [true, "Editora é obrigatoria"]
        },
        numeroPaginas: {
            type: Number,
            validate: {
                validator: (valor) => {
                    return valor >= 10 && valor <= 5000;
                },
                message: "O numero de pagina deve estar entre 10 e 5000"
            }
        },
    }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;