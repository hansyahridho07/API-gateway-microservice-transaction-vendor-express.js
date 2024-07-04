'use strict'

const VenderService = require("../services/vendor.service")
const vendorService = new VenderService()

module.exports = class VendorController {

    static async create(req,res,next){
        const response = await vendorService.create(req.body)
        res.status(response.statusCode).json(response)
    }

    static async findOne(req,res,next){
        const vendor_id = +req.query.vendor_id
        const response = await vendorService.findOne(vendor_id)
        res.status(response.statusCode).json(response)
    }

    static async findAll(req,res,next){
        const queryString = req.query
        const output = await vendorService.findAll(queryString)
        return res.status(output.statusCode).json(output)
    }

    static async update(req,res,next){
        const vendor_id = req.params.id
        const response = await vendorService.update(req.body, vendor_id)
        res.status(response.statusCode).json(response)
    }

    static async delete(req,res,next){
        const vendor_id = +req.query.vendor_id
        const response = await vendorService.delete(vendor_id)
        res.status(response.statusCode).json(response)
    }
}