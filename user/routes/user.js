const router = require("express").Router()
const UserController = require("../controllers/user.controller")
const {validateUser, validateLogin, validateUpdateUser} = require("../middlewares/validations/user_validate")
const { authenticated } = require("../middlewares/authentication")

router.post('/register', validateUser, UserController.register)
router.post('/login', validateLogin, UserController.login)

router.use(authenticated)
router.get('/check-token', UserController.checkToken)
router.get("/", UserController.findOneData)
router.put("/", validateUpdateUser, UserController.update)
router.delete("/", UserController.delete)
module.exports = router