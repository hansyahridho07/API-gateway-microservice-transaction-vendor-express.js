const router = require("express").Router()
const MaterialController = require("../controllers/material.controller")
const{
    validateCreateMaterial,
    validateFindAllMaterial,
    validateFindOneAndDeleteMaterial,
    validateUpdateMaterial
} = require("../middlewares/validation/material_validate")
const { authenticated, authorizedAdmin } = require("../middlewares/authenticate")

router.use(authenticated)
router.post('/', authorizedAdmin, validateCreateMaterial, MaterialController.create)
router.get('/', validateFindOneAndDeleteMaterial, MaterialController.findOne)
router.get('/all', validateFindAllMaterial, MaterialController.findAll)
router.put('/:material_id', authorizedAdmin, validateUpdateMaterial, MaterialController.update)
router.delete('/', authorizedAdmin, validateFindOneAndDeleteMaterial, MaterialController.delete)

module.exports = router