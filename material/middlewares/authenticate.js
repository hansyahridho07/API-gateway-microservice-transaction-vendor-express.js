const DefaultResponse = require('../helpers/generate_response')
const axios = require("axios")
const { httpUserService } = require("../helpers/base_url_microservice")

module.exports = {
    authenticated: async (req, res, next) => {
        const output = new DefaultResponse(false, 401, "")
        if (!req.headers.authorization) {
            output.message = 'Authorization is required'
            return res.status(400).json(output.getBadRequestResponse())
        }
        const accessToken = req.headers.authorization.split(' ')
        if (accessToken.length !== 2) {
            output.message = 'Invalid header Authorization'
            return res.status(400).json(output.getBadRequestResponse())
        }
        if (accessToken[0] !== 'Bearer') {
            output.message = 'Invalid access token'
            return res.status(400).json(output.getBadRequestResponse())
        }

        const token = accessToken[1]
        const config = {
            url: httpUserService.host + httpUserService.path + "/check-token",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }

        try {
            const { data } = await axios(config)
            req.user = data.data
            next()
        } catch (error) {
            if(error?.response?.data){
                const response = error.response.data
                return res.status(response.statusCode).json(response)
            }
            const errorResponse = new DefaultResponse(false,500,'Internal Server Error')
            res.status(errorResponse.statusCode).json(errorResponse.getInternalServerErrorResponse())
        }
    },

    authorizedAdmin: (req, res, next) => {
        if (req.user.role === 'ADMIN') {
            next()
        } else {
            const output = new DefaultResponse(false, 403, "You don't have access")
            return res.status(403).json(output.getForbiddenResponse())
        }
    },

    authorizedUser: (req, res, next) => {
        if (req.user.role === 'USER') {
            next()
        } else {
            const output = new DefaultResponse(false, 403, "You don't have access")
            return res.status(403).json(output.getForbiddenResponse())
        }
    },
}
