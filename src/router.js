// importando e instanciando o router do express
const router = require("express").Router()
// importando os controllers das entidades
const gamesController = require("../controllers/gamesController")
const usersController = require("../controllers/usersController")

// setando o router para lidar com as rotas criadas nos controllers
router.use(gamesController)
router.use(usersController)

module.exports = router