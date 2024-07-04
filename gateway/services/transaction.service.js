const axios = require("axios")
const { httpTransactionService } = require("../helpers/config_services")
class TransactionService {
    base_url = httpTransactionService.host
    base_path = httpTransactionService.path

    async create(body, Authorization){
        const reqBody = {
            "material_id": body.material_id,
            "amount": body.amount,
            "reff_id": body.reff_id
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
                transaction_id: query.transaction_id
            }
        }

        const result = await this.hitAxios(option)
        return result
    }

    async findAll(query, Authorization){

        const option = {
            url: this.base_url + this.base_path + '/history',
            method: "GET",
            headers: {
                Authorization: Authorization
            },
            params: {
                page: query.page,
                size: query.size,
                vendor_name: query.vendor_name,
                customer_name: query.customer_name,
                material_name: query.material_name,
                transaction_id: query.transaction_id,
                reff_id: query.reff_id,
                status: query.status
            }
        }

        const result = await this.hitAxios(option)
        return result
    }

    async update(body, Authorization){
        const reqBody = {
            "transaction_id": body.transaction_id,
            "status": body.status
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

    async delete(params, Authorization){

        const option = {
            url: this.base_url + this.base_path + `/${params.transaction_id}`,
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

module.exports = new TransactionService()