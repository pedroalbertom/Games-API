const router = require("express").Router()
const db = require("../models/gamesModel")

router.get("/", (req, res) => {
    res.send("Hello World!")
})

router.get("/games", (req, res) => {
    res.json(db.games)
})

router.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let game = db.games.find(g => g.id == id)

        if (game != undefined) {
            res.json(game)
        } else {
            res.sendStatus(204)
        }
    }
})

router.post("/games", (req, res) => {

    let { id, title, price, year } = req.body

    if (isNaN(id) || id < 0 || isNaN(price) || price < 0 || isNaN(year) || year < 1900 || title === "" || typeof (title) !== "string") {
        res.sendStatus(204)
    } else {
        db.games.push({
            id,
            title,
            year,
            price
        })
        res.sendStatus(201)
    }

})

router.delete("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let index = db.games.findIndex(g => g.id == id)

        if (index == -1) {
            res.sendStatus(204)
        } else {
            db.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})

router.put("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let game = db.games.find(g => g.id == id)

        if (game != undefined) {
            let {title, price, year } = req.body

            if(title != undefined){
                if(title === "" || typeof (title) != "string"){
                    res.sendStatus(204)
                }
                game.title = title
            }
            if(year != undefined){
                if(isNaN(year) || year < 1900){
                    res.sendStatus(204)
                }
                game.year = year
            }
            if(price != undefined){
                if(isNaN(price) || price < 0){
                    res.sendStatus(204)
                }
                game.price = price
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(204)
        }
    }
})

module.exports = router