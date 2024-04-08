const app = require("./app")
require("dotenv").config()

const PORT = process.env.PORT || 50135

app.listen(50135, () => {
    console.log("Server running on port: 50135")
})