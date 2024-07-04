const bcrypt = require("bcryptjs")

class BcryptPassword {
    /**
     * 
     * @param {string} password 
     * - stirng password to hashing with bcrypt js
     * @returns hash string password
     */
    hashing(password){
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    /**
     * 
     * @param {string} password
     * - string password from user 
     * @param {string} hashPassword
     * - string password from database
     * @returns boolean
     */
    compare(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword)
    }
}

module.exports = new BcryptPassword