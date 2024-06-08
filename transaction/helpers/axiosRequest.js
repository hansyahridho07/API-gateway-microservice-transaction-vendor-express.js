'use strict'

const axios = require("axios")
const DefaultResponse = require("./generate_response")

const httpUserService = {
    host: process.env.URL_USER_SERVICE,
    path: '/v1/api/user'
}

const httpMaterialService = {
    host: process.env.URL_MATERIAL_SERVICE,
    path_vendor: '/v1/api/vendor',
    path_material: '/v1/api/material'
}

const getDataMaterial = async (material_id, token) => {
    const option = {
        url : httpMaterialService.host + httpMaterialService.path_material,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
        params: {
            material_id: material_id
        }
    }

    try {
        const {data} = await axios(option)
        return data.data   
    } catch (error) {
        if(error.response){
            return error.response.data
        } else {
            const error = new DefaultResponse(false, 500, 'Internal Server Error')
            return error
        }
    }

}

module.exports = {getDataMaterial, httpUserService}