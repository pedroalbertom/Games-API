const router = require("express").Router()
// const db = require("../models/gamesModel")

let db = {
    games: [
        {
            id: 1,
            title: "Tibia",
            year: 1997,
            price: 39.99
        },
        {
            id: 2,
            title: "Ragnarok",
            year: 2002,
            price: 10
        },
        {
            id: 3,
            title: "World of Warcraft",
            year: 2004,
            price: 39.99
        },
        {
            id: 4,
            title: "Counter Strike: Global Offensive",
            year: 2012,
            price: 19.99
        },
        {
            id: 5,
            title: "League of Legends",
            year: 2009,
            price: 0
        }
    ]
}

router.get("/", (req, res) => {
    res.send("Hello World!")
})

router.get("/games", (req, res) => {
    res.json(db.games)
})

router.get("/games/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        let id = parseInt(req.params.id)
        let game = db.games.find(g => g.id == id)

        if(game != undefined){
            res.json(game)
        }else{
            res.sendStatus(204)
        }
    }
})

router.post("/games", (req, res) => {

    let {id, title, price, year} = req.body
    db.games.push({
        id,
        title,
        year,
        price
    })

    res.sendStatus(201)

})

module.exports = router