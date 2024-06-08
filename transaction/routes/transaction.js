const router = require("express").Router()
const transactionController = require("../controllers/transaction.controller")
const {authenticated, authorizedUser, authorizedAdmin} = require("../middlewares/authenticate")
const {
    validateCreateTransaction,
    validateDeleteTransaction,
    validateFindAllTransaction,
    validateFindOneTransaction,
    validateUpdateStatusTransaction
} = require('../middlewares/validations/transaction_validate')

router.use(authenticated)
router.post('/', authorizedUser, validateCreateTransaction, transactionController.create)
router.get('/history', validateFindAllTransaction, transactionController.findAll)
router.get('/', validateFindOneTransaction, transactionController.findOne)
router.put('/', authorizedAdmin, validateUpdateStatusTransaction, transactionController.updateStatus)
router.delete('/:transaction_id', authorizedAdmin, validateDeleteTransaction, transactionController.delete)
module.exports = router