const transactionService =  require("../services/transaction.service")

class TransactionController {
    async create(req,res){
        const output = await transactionService.create(req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async findAll(req,res){
        const output = await transactionService.findAll(req.query, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async findOne(req,res){
        const output = await transactionService.findOne(req.query, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async update(req,res){
        const output = await transactionService.update(req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async delete(req,res){
        const output = await transactionService.delete(req.params, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }
}

module.exports = new TransactionController()