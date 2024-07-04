const vendorService =  require("../services/vendor.service")

class VendorController {
    async create(req,res){
        const output = await vendorService.create(req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async findAll(req,res){
        const output = await vendorService.findAll(req.query, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async findOne(req,res){
        const output = await vendorService.findOne(req.query, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async update(req,res){
        const output = await vendorService.update(req.params, req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async delete(req,res){
        const output = await vendorService.delete(req.params.vendor_id, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }
}

module.exports = new VendorController()