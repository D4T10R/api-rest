import express from "express";
import db from "./config/dbConnect.js"
import livros from "./models/livros.js";
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, "ERRO DE CONEXÃO"))
db.once("open", () => {
    console.log("CONEXÃO com com o banco feita com SUCESSO")
})

const app = express();

app.use(express.json()) // para transformar o que chegou em POST ou PUT em JSON

routes(app)


export default app