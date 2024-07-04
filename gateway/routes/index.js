const routes = require("express").Router()
const userRoutes = require("./user")
const materialRoutes = require("./material")
const transactionRoutes = require("./transaction")
const vendorRoutes = require("./vendor")

routes.use('/user', userRoutes)
routes.use('/material', materialRoutes)
routes.use('/transaction', transactionRoutes)
routes.use('/vendor', vendorRoutes)

module.exports = routes