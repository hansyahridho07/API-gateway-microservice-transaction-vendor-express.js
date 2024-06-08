const materialService =  require("../services/material.service")

class MaterilController {
    async create(req,res){
        const output = await materialService.create(req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async findAll(req,res){
        const output = await materialService.findAll(req.query, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async findOne(req,res){
        const output = await materialService.findOne(req.query, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async update(req,res){
        const output = await materialService.update(req.params, req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async delete(req,res){
        const output = await materialService.delete(req.params.material_id, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }
}

module.exports = new MaterilController()