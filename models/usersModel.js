// instanciando o sequelize ORM para lidar com mysql
const Sequelize = require("sequelize")
// instanciando a conexão com o banco de dados
const connection = require("../config/db_connection")

const Users = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// se a tabela já existir, ele não força a criação novamente, se ela não existir ele cria.
Users.sync({force: false}).then(() => {console.log("Tabela users criada!")})

module.exports = Users