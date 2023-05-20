import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        nacionalidade: {type: String, required: true}
    },

    {
        versionKey: false
    }
);

const autores = mongoose.model("autor", autorSchema);

export default  autores;