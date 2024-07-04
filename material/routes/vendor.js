const router = require("express").Router()
const VendorController = require("../controllers/vendor.controller")
const {validateQueryFindAll, validateVendorRequestAndUpdate, validateQueryFindOneAndDelete} = require("../middlewares/validation/vendor_validate")
const { authenticated, authorizedAdmin } = require("../middlewares/authenticate")

router.use(authenticated)
router.post('/', authorizedAdmin, validateVendorRequestAndUpdate, VendorController.create)
router.get('/', validateQueryFindOneAndDelete, VendorController.findOne)
router.get('/all', validateQueryFindAll, VendorController.findAll)
router.put('/:id', authorizedAdmin, validateVendorRequestAndUpdate, VendorController.update)
router.delete('/', authorizedAdmin, validateQueryFindOneAndDelete, VendorController.delete)

module.exports = router