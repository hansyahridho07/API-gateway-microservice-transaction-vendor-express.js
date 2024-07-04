const router = require("express").Router()
const materialController = require("../controllers/material.controller")

router.post('/', materialController.create)
router.get('/all', materialController.findAll)
router.put('/:material_id', materialController.update)
router.delete('/:material_id', materialController.delete)

module.exports = router