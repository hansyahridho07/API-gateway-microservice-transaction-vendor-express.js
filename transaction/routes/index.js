const routes = require("express").Router()
const transactionRoute = require("./transaction")

routes.use('/transaction', transactionRoute)

module.exports = routes