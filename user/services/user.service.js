const DefaultResponse = require("../helpers/generate_response")
const UserRepository = require("../repository/user.repository")
const BcryptPassword = require("../helpers/hash_password")
const JwtHelper = require("../helpers/jsonwebtoken")
const userRepository = new UserRepository()
class UserService {

    /**
     * @param {Object} registerDto
     * @param {string} registerDto.name
     * @param {string} registerDto.username
     * @param {string} registerDto.password
     * @param {string} registerDto.role
     * @returns {Promise<DefaultResponse>}
     */
    async register(registerDto){
        const checkUsername = await userRepository.checkUsername(registerDto.username)
        const response = new DefaultResponse(true, 201, 'success create user')
        if(checkUsername){
            response.message = "username already use"
            return response.getBadRequestResponse()
        }
        await userRepository.register(registerDto)

        return response.getSuccessResponse()
    }

    /**
     * @param {Object} loginDto
     * @param {string} loginDto.username
     * @param {string} loginDto.password 
     * @returns {Promise<DefaultResponse>}
     */
    async login(loginDto) {
        const { username, password } = loginDto
        const response = new DefaultResponse(true, 200, 'success login')

        const checkUsername = await userRepository.checkUsername(username)
        if(!checkUsername){
            console.error("wrong username!")
            response.message = "username or password wrong"
            return response.getBadRequestResponse()
        }

        if(!BcryptPassword.compare(password,checkUsername.password)){
            console.error("wrong password!")
            response.message = "username or password wrong"
            return response.getBadRequestResponse()
        }

        const payloadJwt = {
            id: checkUsername.id,
            name: checkUsername.name,
            role: checkUsername.role
        }
        const token = JwtHelper.signJwt(payloadJwt)
        const responseToken = {
            type: "Bearer",
            access_token: token,
            expired_in: 15 * 60 * 1000 // 15 minutes
        }
        response.data = responseToken

        return response.getSuccessResponse()
    }

    /**
     * @param {number} id 
     * @returns {Promise<DefaultResponse>}
     */
    async findOneUser(id){
        const output = new DefaultResponse(true, 200, 'success get data user')
        const check = await userRepository.checkId(id)
        if(!check){
            output.message = "user not found"
            return output.getNotFoundResponse()
        }
        const objectResponse = {
            id: check.id,
            name: check.name,
            username: check.username,
            role: check.role
        }
        output.data = {...objectResponse}

        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {Object} updateUserDto
     * @param {String?} updateUserDto.name
     * @param {String?} updateUserDto.username
     * @param {String?} updateUserDto.password
     * @param {*} id 
     * @returns {Promise<DefaultResponse>}
     */
    async update(updateUserDto, id) {
        const { name, username, password } = updateUserDto
        const output = new DefaultResponse(true, 200, 'success update data user')
        const updateData = {}
        const checkData = await userRepository.checkId(id)

        if(!checkData){
            output.message = "user not found"
            return output.getNotFoundResponse()
        }

        if(username){
            const checkUsername = await userRepository.checkUsername(username)
            if(checkUsername){
                output.message = "username already used"
                return output.getBadRequestResponse()
            }
            updateData.username = username
        }

        if(name) updateData.name = name
        if(password) updateData.password = BcryptPassword.hashing(password)

        await userRepository.update(updateData, id)
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<DefaultResponse>}
     */
    async delete(id){
        const output = new DefaultResponse(true, 200, 'success delete user')
        const check = await userRepository.checkId(id)
        
        if(!check){
            output.message = "user not found"
            return output.getNotFoundResponse()
        }
        await userRepository.delete(id)
        return output.getSuccessResponse()
    }
}

module.exports = UserService