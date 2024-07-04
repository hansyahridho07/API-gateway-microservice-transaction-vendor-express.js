const router = require("express").Router()
const userRouter = require("./user")
// const vendorRouter = require("./vendor")

router.use("/user",userRouter)
// router.use("/vendor",vendorRouter)


module.exports = router