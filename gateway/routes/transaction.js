const router = require("express").Router()
const transactionController = require("../controllers/transaction.controller")

router.post('/', transactionController.create)
router.get('/history', transactionController.findAll)
router.get('/', transactionController.findOne)
router.put('/', transactionController.update)
router.delete('/:transaction_id', transactionController.delete)

module.exports = router