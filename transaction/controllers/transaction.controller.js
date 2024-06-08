const transactionService = require("../services/transaction.service")

class TransactionController {
    async create(req,res,next){
        const accessTokenSplit = req.headers.authorization.split(" ")
        const response = await transactionService.create(req.body, accessTokenSplit[1], req.user)
        res.status(response.statusCode).json(response)
    }

    async findOne(req,res,next){
        const transaction_id = +req.query.transaction_id
        const response = await transactionService.findOne(transaction_id, req.user)
        res.status(response.statusCode).json(response)
    }

    async findAll(req,res,next){
        const query = req.query
        const response = await transactionService.findAll(query, req.user)
        res.status(response.statusCode).json(response)
    }
    
    async updateStatus(req,res,next){
        const body = req.body
        const response = await transactionService.updateStatus(body)
        res.status(response.statusCode).json(response)
    }

    async delete(req,res,next){
        const transaction_id = +req.params.transaction_id
        const response = await transactionService.delete(transaction_id)
        res.status(response.statusCode).json(response)
    }
}

module.exports = new TransactionController()