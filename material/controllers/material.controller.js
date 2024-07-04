'use strict'

const materialService = require('../services/material.service')

class MaterialController {
    async create(req,res,next){
        const output = await materialService.create(req.body)
        res.status(output.statusCode).json(output)
    }

    async findOne(req,res,next){
        const material_id = +req.query.material_id
        const output = await materialService.findOne(material_id)
        res.status(output.statusCode).json(output)
    }

    async findAll(req,res,next) {
        const query = req.query
        const output = await materialService.findAll(query)
        res.status(output.statusCode).json(output)
    }

    async update(req,res,next) {
        const body = req.body
        const material_id = +req.params.material_id
        const output = await materialService.update(body, material_id)
        res.status(output.statusCode).json(output)
    }

    async delete(req,res,next) {
        const material_id = +req.query.material_id
        const output = await materialService.delete(material_id)
        res.status(output.statusCode).json(output)
    }
}

module.exports = new MaterialController()