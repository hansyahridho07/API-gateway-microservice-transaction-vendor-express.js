'use strict'

const express =  require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const routes = require("./routes/index")

const app = express()
dotenv.config()
const PORT = process.env.PORT

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/v1/api", routes)

app.listen(PORT, () => {
    console.log("Run in port: " + PORT)
})