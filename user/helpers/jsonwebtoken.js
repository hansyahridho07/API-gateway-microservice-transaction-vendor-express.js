const jwt = require('jsonwebtoken');
const secretJwt = process.env.SECRET_JWT || "narutoooo"
module.exports = class JwtHelper {
    /**
     * 
     * @param {object{id: string, role:string}} 
     * @returns {string}
     */
    static signJwt(payload){
        return jwt.sign(payload, secretJwt)
    }

    /**
     * 
     * @param {string} token 
     * @returns {boolean | object{id: string, role:string}}
     */

    static verifyJwt(token){
        try {
            return jwt.verify(token, secretJwt)
        } catch (error) {
            console.error("ERROR VERIFY JWT")
            return false
        }
    }
}