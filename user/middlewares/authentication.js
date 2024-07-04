const DefaultResponse = require('../helpers/generate_response')
const JwtHelper = require("../helpers/jsonwebtoken")

module.exports = {
    authenticated: (req, res, next) => {
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
        const payload = JwtHelper.verifyJwt(token)

        if (!payload) {
            output.message = 'Unauthorized'
            return res.status(401).json(output.getUnauthorizedResponse())
        } else {
            req.user = { ...payload }
            next()
        }
    },

    authorizedAdmin: (req, res, next) => {
        const output = new DefaultResponse(false, 401, "")
        if (req.user.role === 'ADMIN') {
            next()
        } else {
            const output = new DefaultResponse(false, 403, "You don't have access")
            return res.status(403).json(output.getForbiddenResponse())
        }
    },

    authorizedUser: (req, res, next) => {
        const output = new DefaultResponse(false, 403, "")
        if (req.user.role === 'USER') {
            next()
        } else {
            const output = new DefaultResponse(false, 403, "You don't have access")
            return res.status(403).json(output.getForbiddenResponse())
        }
    },
}
