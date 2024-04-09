// importando e inicializando a config do .env
require("dotenv").config()
// importando o JWT
const jwt = require("jsonwebtoken")

function auth(req, res, next){
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const token = authToken.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err){
                res.json({err: "Token inválido!"}).status(401)
            }else{
                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                next()
            }
        })
    }else{
        res.json({err: "Não autorizado!"}).status(401)
    }    
}

module.exports = auth