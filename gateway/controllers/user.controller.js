const userService = require('../services/user.service')

class UserController {
    async register(req,res){
        const output = await userService.register(req.body)
        res.status(output.statusCode).json(output)
    }

    async login(req,res){
        const output = await userService.login(req.body)
        res.status(output.statusCode).json(output)
    }

    async findOne(req,res){
        const output = await userService.findOne(req.headers.authorization)
        res.status(output.statusCode).json(output)
    }
    
    async update(req,res){
        const output = await userService.update(req.body, req.headers.authorization)
        res.status(output.statusCode).json(output)
    }

    async delete(req,res){
        const output = await userService.delete(req.headers.authorization)
        res.status(output.statusCode).json(output)
    }
}

module.exports = new UserController()