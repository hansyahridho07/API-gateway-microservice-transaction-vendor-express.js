const router = require("express").Router()
const userController = require("../controllers/user.controller")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/", userController.findOne)
router.put("/", userController.update)
router.delete("/", userController.delete)

module.exports = router