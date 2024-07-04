const routes = require("express").Router()
const materialRoute = require("./material")
const vendorRouter = require("./vendor")

routes.use('/material', materialRoute)
routes.use("/vendor",vendorRouter)

module.exports = routes