const axios = require("axios")
const { httpUserService } = require("../helpers/config_services")
class UserService {
    base_url = httpUserService.host
    base_path = httpUserService.path

    async register(body){
        const reqBody = {
            "name": body.name,
            "username": body.username,
            "password": body.password,
            "role": "USER"
        }

        const option = {
            url: this.base_url + this.base_path + '/register',
            method: "POST",
            data: {...reqBody}
        }

        const result = await this.hitAxios(option)
        return result
        
    }

    async login(body){
        const reqBody = {
            "username": body.username,
            "password": body.password,
        }

        const option = {
            url: this.base_url + this.base_path + '/login',
            method: "POST",
            data: {...reqBody}
        }

        const result = await this.hitAxios(option)
        return result
    }

    async findOne(Authorization){

        const option = {
            url: this.base_url + this.base_path,
            method: "GET",
            headers: {
                Authorization: Authorization
            }
        }

        const result = await this.hitAxios(option)
        return result
    }

    async update(body, Authorization){
        const reqBody = {
            "name": body.name,
            "username": body.username,
            "password": body.password,
        }

        const option = {
            url: this.base_url + this.base_path,
            method: "PUT",
            headers: {
                Authorization: Authorization
            },
            data: {...reqBody}
        }

        const result = await this.hitAxios(option)
        return result
    }

    async delete(Authorization){

        const option = {
            url: this.base_url + this.base_path,
            method: "DELETE",
            headers: {
                Authorization: Authorization
            }
        }

        const result = await this.hitAxios(option)
        return result
    }

    async hitAxios(option){
        try {
            const {data} = await axios(option)
            return data
        } catch (error) {
            if(error.response){
                console.log("=====EXPECTED ERROR=====")
                console.log(error.response.data)
                return error.response.data
            }
            console.log("=====UNEXPECTED ERROR=====")
                console.log(error)
            return {
                success:false,
                statusCode: 500,
                message: "Internal Server Error",
                data: null
            }
        }
    }
}

module.exports = new UserService()