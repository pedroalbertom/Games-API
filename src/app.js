// importando o express, microframework usado para criar uma api
const express = require("express")
// instanciando o express em app
const app = express()
// importando o router
const router = require("./router")
// importando o cors, responsável por viabilizar a comunicação entre aplicações com domínios diferentes
const cors = require("cors")
// importando e inicializando a config do .env
require("dotenv").config()

// setando o express para usar o cors
app.use(cors())
// Essa linha habilita o middleware express.urlencoded, que é um middleware incorporado no Express.js para lidar com dados enviados via formulários HTML usando o método POST.
app.use(express.urlencoded({extended: false}))
// setando o express para usar json
app.use(express.json())
// setando o express para usar o router
app.use(router)

// setando a rota "home"
app.get("/", (req, res) => {
    res.send("Hello World!")
})

// importando a porta setada no .env
const PORT = process.env.PORT || 50135

app.listen(50135, () => {
    console.log("Server running on port: 50135")
})
