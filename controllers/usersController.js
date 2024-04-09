// instanciando o router do express
const router = require("express").Router()
// importando o model do banco de dados dos jogos
const db = require("../models/usersModel")

// rota READ
router.get("/users", (req, res) => {
    db.findAll().then(users => {
        res.json(users)
    })
})

// rota READ ID
router.get("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        db.findByPk(id).then(user => {
            if (user != undefined) {
                res.json(user)
            } else {
                res.sendStatus(204)
            }
        })
    }
})

// rota CREATE
router.post("/users", (req, res) => {

    let { name, email, password } = req.body

    if (name === "" || typeof (name) !== "string" || email === "" || typeof (email) !== "string" || password === "" || typeof (password) !== "string") {
        res.sendStatus(204)
    } else {
        db.create({
            name: name,
            email: email,
            password: password
        }).then(() => {
            res.sendStatus(201)
        })
    }
})

// rota DELETE
router.delete("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let user = db.findByPk(id)

        if(user != undefined){
            db.destroy({ where: {id: id} }).then(() => {
                res.sendStatus(200)
            })
        }else{
            res.sendStatus(204)
        }
    }
})

// rota UPDATE
router.put("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        db.findByPk(id).then(user => {
            if (user != undefined) {
                let {name, email, password} = req.body
    
                if(name != undefined){
                    if(name === "" || typeof(name) !== "string"){
                        res.sendStatus(204)
                    }
                    user.update({ name: name })
                }
                if(email != undefined){
                    if(email === "" || typeof(email) !== "string"){
                        res.sendStatus(204)
                    }
                    user.update({ email: email })
                }
                if(password != undefined){
                    if(password === "" || typeof(password) !== "string"){
                        res.sendStatus(204)
                    }
                    user.update({ password: password })
                }
                res.sendStatus(200)
            } else {
                res.sendStatus(204)
            }
        })
    }
})

// rota que gera o token após o login
router.post("/auth", (req, res) => {
    let {email, password} = req.body

    if (email === "" || typeof (email) !== "string" || password === "" || typeof (password) !== "string"){
        res.status(400).json({err: "O e-mail ou senha são inválidos!"})
    }else{
        db.findOne({where: {email:  email}}).then(user => {
            if(user != undefined){
                if(user.password == password){
                    res.status(200).json({token: "@#$%WDFGwefg234562ewrfG@$%fweqrt"})
                }else{
                    res.status(401).json({err: "Credenciais inválidas!"})
                }
            }else{
                res.status(404).json({err: "E-mail não cadastrado!"})
            }
        })
    }
})

module.exports = router