require('dotenv').config()

const httpUserService = {
    host: process.env.URL_USER_SERVICE,
    path: '/v1/api/user'
}

const httpMaterialService = {
    host: process.env.URL_MATERIAL_SERVICE,
    path_vendor: '/v1/api/vendor',
    path_material: '/v1/api/material'
}

const httpTransactionService = {
    host: process.env.URL_TRANSACTION_SERVICE,
    path: '/v1/api/transaction'
}

module.exports = { httpUserService, httpMaterialService, httpTransactionService }