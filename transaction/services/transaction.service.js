const DefaultResponse = require("../helpers/generate_response")
const transactionRepository = require("../repository/transaction.repository")
const { getDataMaterial} = require("../helpers/axiosRequest")
const { Op } = require("sequelize")
class TransactionService {
    /**
     * 
     * @param {Object} createTransactionDto
     * @param {number} createTransactionDto.material_id
     * @param {number} createTransactionDto.amount
     * @param {string} createTransactionDto.reff_id
     * @param {string} access_token
     * @param {Object} payloadJwt 
     * @param {number} payloadJwt.id
     * @param {string} payloadJwt.name
     * @param {string} payloadJwt.role
     * @returns {Promise<DefaultResponse>}
     */
    async create(createTransactionDto, access_token, payloadJwt){
        const { material_id, amount, reff_id } = createTransactionDto
        const output = new DefaultResponse(true, 201, 'success create transaction')

        const dataMaterial = await getDataMaterial(material_id, access_token)
        if(dataMaterial instanceof DefaultResponse){
            return dataMaterial.getInternalServerErrorResponse()
        } else if(!dataMaterial.status){
            output.message = dataMaterial.message
            return output.getBadRequestResponse()
        }

        if(dataMaterial.status === "EMPTY"){
            output.message = `stock ${dataMaterial.material_name} is EMPTY`
            return output.getBadRequestResponse()
        }

        const check_reff_id = await transactionRepository.checkReffId(reff_id)

        if(check_reff_id){
            output.message = "reff_id already exists, please use different reff_id"
            return output.getBadRequestResponse()
        }

        /**
        * @param {Object} createTransaction 
        * @param {Object} createTransaction.customer
        * @param {Object} createTransaction.vendor
        * @param {Object} createTransaction.material
        * @param {number} createTransaction.customer.id
        * @param {string} createTransaction.customer.name
        * @param {number} createTransaction.vendor.id
        * @param {string} createTransaction.vendor.name
        * @param {string} createTransaction.vendor.address
        * @param {number} createTransaction.material.id
        * @param {string} createTransaction.material.name
        * @param {number} createTransaction.material.amount
        * @param {string} createTransaction.reff_id
        * @param {string} createTransaction.status
         */
        const createTransaction = {
            customer: {
                id: +payloadJwt.id,
                name: String(payloadJwt.name)
            },
            vendor: {
                id: +dataMaterial.vendor.id,
                name: String(dataMaterial.vendor.name),
                address: String(dataMaterial.vendor.address)
            },
            material: {
                id: +dataMaterial.id,
                name: String(dataMaterial.material_name),
                amount: +amount
            },
            reff_id: reff_id,
            status: "PENDING"
        }

        await transactionRepository.create(createTransaction)
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {number} transaction_id 
     * @param {Object} payloadJwt 
     * @param {number} payloadJwt.id
     * @param {string} payloadJwt.name
     * @param {string} payloadJwt.role
     * @returns {Promise<DefaultResponse>}
     */
    async findOne(transaction_id, payloadJwt){
        const check = await transactionRepository.findOne(transaction_id)
        const output = new DefaultResponse(true, 200, 'success get transaction')

        if(!check){
            output.message = 'transaction not found'
            return output.getNotFoundResponse()
        }

        if(check.customer.id !== payloadJwt.id && payloadJwt.role === "USER"){
            output.message = "transaction record is not your transaction"
            return output.getBadRequestResponse()
        }

        output.data = {...check}

        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {Object} whereCondition
     * @param {string?} whereCondition.vendor_name
     * @param {string?} whereCondition.customer_name
     * @param {string?} whereCondition.material_name
     * @param {number?} whereCondition.transaction_id
     * @param {string?} whereCondition.reff_id
     * @param {string?} whereCondition.status
     * @param {number} whereCondition.page
     * @param {number} whereCondition.size 
     * @param {Object} payloadJwt 
     * @param {number} payloadJwt.id
     * @param {string} payloadJwt.name
     * @param {string} payloadJwt.role
     * @returns {Promise<DefaultResponse>}
     */
    async findAll(whereCondition, payloadJwt){
        const { customer_name, material_name, status, vendor_name, transaction_id, reff_id, page, size} = whereCondition
        const output = new DefaultResponse(true, 200, 'success get data materials')
        const whereObject = {}

        if(payloadJwt.role === "USER"){
            whereObject.customer = {
                id: payloadJwt.id
            }
        }

        if(transaction_id || reff_id){
            if(transaction_id) whereObject.id = transaction_id
            else whereObject.reff_id = reff_id
        } else {
            if(customer_name){
                whereObject.customer = {
                    name: {
                        [Op.like]: `%${customer_name}%`
                    }
                }
            }
            if(vendor_name){
                whereObject.vendor = {
                    name: {
                        [Op.like]: `%${vendor_name}%`
                    }
                }
            }
            if(material_name){
                whereObject.material = {
                    name: {
                        [Op.like]: `%${material_name}%`
                    }
                }
            }

            if(status){
                whereObject.status = status
            }
        }

        const result = await transactionRepository.findAll(whereObject, {page:+page, pageSize:+size})

        output.data = {...result}
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {Object} updateTransactionDto
     * @param {number} updateTransactionDto.transaction_id
     * @param {string} updateTransactionDto.status
     * @returns {Promise<DefaultResponse>}
     */
    async updateStatus(updateTransactionDto){
        const {transaction_id,status} = updateTransactionDto
        const output = new DefaultResponse(true, 200, 'success update transaction')

        const checkTransaction = await transactionRepository.findOne(transaction_id)
        if(!checkTransaction){
            output.message = 'transaction not found'
            return output.getNotFoundResponse()
        }

        /**
         * --- RULE ---
         * Update status yang DIPERBOLEHKAN
         * PENDING -> SUCCESS
         * PENDING -> FAILED
         * SUCCESS -> FAILED
         * FAILED -> SUCCESS (perlu pertimbangan)
         * =============================================
         * Update status yang TIDAK DIPERBOLEHKAN
         * SUCCESS -> PENDING
         * FAILED -> PENDING
         */

        if(status === "PENDING" && checkTransaction.status === "PENDING"){
            output.message = "transaction still PENDING"
            return output.getBadRequestResponse()
        }

        if(status === "PENDING" && checkTransaction.status !== "PENDING"){
            output.message = "can't change status back to PENDING"
            return output.getBadRequestResponse()
        }

        await transactionRepository.update(status, transaction_id)

        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {number} transaction_id 
     * @returns {Promise<DefaultResponse>}
     */
    async delete(transaction_id){
        const output = new DefaultResponse(true, 200, 'success delete transaction')

        const checkTransaction = await transactionRepository.findOne(transaction_id)
        if(!checkTransaction){
            output.message = 'transaction not found'
            return output.getNotFoundResponse()
        }

        await transactionRepository.delete(transaction_id)

        return output.getSuccessResponse()
    }
}

module.exports = new TransactionService()