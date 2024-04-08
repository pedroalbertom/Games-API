const Sequelize = require("sequelize")
const connection = require("../config/db_connection")

const Games = connection.define('games', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Games.sync({force: false}).then(() => {console.log("Tabela games criada!")})

module.exports = Games