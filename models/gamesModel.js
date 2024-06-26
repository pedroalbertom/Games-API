// instanciando o sequelize ORM para lidar com mysql
const Sequelize = require("sequelize")
// instanciando a conexão com o banco de dados
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

// se a tabela já existir, ele não força a criação novamente, se ela não existir ele cria.
Games.sync({force: false}).then(() => {console.log("Tabela games criada!")})

module.exports = Games