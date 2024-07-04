const { user } = require("../models/index")

module.exports = class UserRepository {
    /**
     * @param {Object} userDto
     * @param {string} userDto.name
     * @param {string} userDto.username
     * @param {string} userDto.password
     * @param {string} userDto.role
     * @returns {Promise<void>}
     */
    async register(userDto) {
        const { name, username, password, role } = userDto

        await user.create({
            name: name,
            password: password,
            username: username,
            role: role
        })
    }

    /**
     * @param {string} username 
     * @returns {Promise<{id:number, name:string, username: string, password:string, role:string>}}
     */
    async checkUsername(username) {
        const check = await user.findOne({
            where: { username: username }
        })

        return check
    }

    /**
     * @param {number} id 
     * @returns {Promise<{id:number, name:string, username: string, password:string, role:string}>}
     */
    async checkId(id){
        const check = await user.findByPk(id)
        return check
    }

    /**
     * @param {Object} updateData
     * @param {string?} updateData.name
     * @param {string?} updateData.username
     * @param {string?} updateData.password
     * @param {number} id 
     * @returns {Promise<void>}
     */
    async update(updateData, id){
        await user.update(updateData, {where:{ id: id}})
    }

    /**
     * @param {number} id
     * @description Delete  user with where condition is id
     * @returns {Promise<void>}
     */
    async delete(id) {
        await user.destroy({where:{id:id}})
    }
}