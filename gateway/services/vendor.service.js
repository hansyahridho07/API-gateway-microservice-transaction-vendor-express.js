const axios = require("axios")
const { httpMaterialService } = require("../helpers/config_services")
class VendorService {
    base_url = httpMaterialService.host
    base_path = httpMaterialService.path_vendor

    async create(body, Authorization){
        const reqBody = {
            "name": body.name,
            "address": body.address
        }

        const option = {
            url: this.base_url + this.base_path,
            method: "POST",
            headers: {
                Authorization: Authorization
            },
            data: {...reqBody}
        }

        const result = await this.hitAxios(option)
        return result
        
    }


    async findOne(query, Authorization){

        const option = {
            url: this.base_url + this.base_path,
            method: "GET",
            headers: {
                Authorization: Authorization
            },
            params: {
                vendor_id: query.vendor_id
            }
        }

        const result = await this.hitAxios(option)
        return result
    }

    async findAll(query, Authorization){

        const option = {
            url: this.base_url + this.base_path + '/all',
            method: "GET",
            headers: {
                Authorization: Authorization
            },
            params: {
                page: query.page,
                size: query.size
            }
        }

        const result = await this.hitAxios(option)
        return result
    }

    async update(params, body, Authorization){
        const reqBody = {
            "name": body.name,
            "address": body.address
        }

        const option = {
            url: this.base_url + this.base_path + `/${params.vendor_id}`,
            method: "PUT",
            headers: {
                Authorization: Authorization
            },
            data: {...reqBody}
        }

        const result = await this.hitAxios(option)
        return result
    }

    async delete(vendor_id, Authorization){

        const option = {
            url: this.base_url + this.base_path,
            method: "DELETE",
            headers: {
                Authorization: Authorization
            },
            params: {
                vendor_id: vendor_id
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

module.exports = new VendorService()