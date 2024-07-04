const router = require('express').Router()
const vendorController = require("../controllers/vendor.controller")

router.post('/', vendorController.create)
router.get('/all', vendorController.findAll)
router.put('/:vendor_id', vendorController.update)
router.delete('/:vendor_id', vendorController.delete)
module.exports = router