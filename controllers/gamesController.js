const router = require("express").Router()
const db = require("../models/gamesModel")

router.get("/", (req, res) => {
    res.send("Hello World!")
})

router.get("/games", (req, res) => {
    db.findAll().then(games => {
        res.json(games)
    })
})

router.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        db.findByPk(id).then(game => {
            if (game != undefined) {
                res.json(game)
            } else {
                res.sendStatus(204)
            }
        })
    }
})

router.post("/games", (req, res) => {

    let { title, price, year } = req.body

    if (isNaN(price) || price < 0 || isNaN(year) || year < 1900 || title === "" || typeof (title) !== "string") {
        res.sendStatus(204)
    } else {
        db.create({
            title: title,
            year: year,
            price: price
        }).then(() => {
            res.sendStatus(201)
        })
    }
})

router.delete("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let game = db.findByPk(id)

        if(game != undefined){
            db.destroy({ where: {id: id} }).then(() => {
                res.sendStatus(200)
            })
        }else{
            res.sendStatus(204)
        }
    }
})

router.put("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        db.findByPk(id).then(game => {
            if (game != undefined) {
                let {title, price, year} = req.body
    
                if(title != undefined){
                    if(title === "" || typeof(title) !== "string"){
                        res.sendStatus(204)
                    }
                    game.update({ title: title })
                }
                if(year != undefined){
                    if(isNaN(year) || year < 1900){
                        res.sendStatus(204)
                    }
                    game.update({ year: year })
                }
                if(price != undefined){
                    if(isNaN(price) || price < 0){
                        res.sendStatus(204)
                    }
                    game.update({ price: price })
                }
                res.sendStatus(200)
            } else {
                res.sendStatus(204)
            }
        })
    }
})

module.exports = router