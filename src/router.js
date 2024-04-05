const router = require("express").Router()
const gamesController = require("../controllers/gamesController")

router.use(gamesController)

module.exports = router