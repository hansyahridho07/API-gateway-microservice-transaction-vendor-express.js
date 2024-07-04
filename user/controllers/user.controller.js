const DefaultResponse = require('../helpers/generate_response')
const UserService = require('../services/user.service')
const userService = new UserService()

module.exports = class UserController {

    static async register(req,res,next){
        const response = await userService.register(req.body)
        res.status(response.statusCode).json(response)
    }

    static async login(req,res,next){
        const response = await userService.login(req.body)
        res.status(response.statusCode).json(response)
    }

    static async checkToken(req,res,next){
        const output = new DefaultResponse(true, 200, "success", req.user)
        res.status(200).json(output.getSuccessResponse())
    }

    static async findOneData(req,res,next){
        /**
         * @param {Object{id: number, role: string}} payloadUser
         */
        const payloadUser = req.user
        const response = await userService.findOneUser(payloadUser.id)
        res.status(response.statusCode).json(response)
    }

    static async update(req,res,next){
        /**
         * @param {Object{id: number, role: string}} payloadUser
         */
        const payloadUser = req.user
        const response = await userService.update(req.body, payloadUser.id)
        res.status(response.statusCode).json(response)
    }

    static async delete(req,res,next){
        /**
         * @param {Object{id: number, role: string}} payloadUser
         */
        const payloadUser = req.user        
        const response = await userService.delete(payloadUser.id)
        res.status(response.statusCode).json(response)
    }
}