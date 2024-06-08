const { Op } = require("sequelize")
const {transaction} = require("../models/index")

class TransactionRepository {
    /**
     * 
     * @param {Object} createTransactionDto 
     * @param {Object} createTransactionDto.customer
     * @param {Object} createTransactionDto.vendor
     * @param {Object} createTransactionDto.material
     * @param {number} createTransactionDto.customer.id
     * @param {string} createTransactionDto.customer.name
     * @param {number} createTransactionDto.vendor.id
     * @param {string} createTransactionDto.vendor.name
     * @param {string} createTransactionDto.vendor.address
     * @param {number} createTransactionDto.material.id
     * @param {string} createTransactionDto.material.name
     * @param {number} createTransactionDto.material.amount
     * @param {string} createTransactionDto.reff_id
     * @param {string} createTransactionDto.status
     * @returns {Promise<void>}
     */
    async create(createTransactionDto) {
        await transaction.create(createTransactionDto)
    }

    /**
     * 
     * @param {number} transaction_id 
     * @returns {Promise<transaction>}
     */
    async findOne(transaction_id) {
        let check = await transaction.findOne({
            where: {
                [Op.or]: [
                    { id: transaction_id },
                    { reff_id: {
                        [Op.like]: `%${transaction_id}%`
                    }}
                ]
            }
        })
        if(!check) return false
        
        check = JSON.parse(JSON.stringify(check))
        check.customer = JSON.parse(check.customer)
        check.vendor = JSON.parse(check.vendor)
        check.material = JSON.parse(check.material)
        return check
    }

    async findAll(where, {page, pageSize}){
        const options = {
            page: page,
            paginate: pageSize,
            order: [["id","desc"]],
            where: {...where}
        }
        let result = await transaction.paginate(options)
        for(let i = 0; i < result.docs.length; i++){
            result.docs[i].dataValues.customer = JSON.parse(result.docs[i].dataValues.customer)
            result.docs[i].dataValues.vendor = JSON.parse(result.docs[i].dataValues.vendor)
            result.docs[i].dataValues.material = JSON.parse(result.docs[i].dataValues.material)
        }
        const output = {
            docs: result.docs,
            page: page,
            totalPage: result.pages,
            total: result.total
        }
        return output
    }

    /**
     * 
     * @param {string} status
     * @param {number} transaction_id 
     * @returns {Promise<void>}
     */
    async update(status, transaction_id){
        await transaction.update({
            status: status
        }, {
            where: {
                id: transaction_id
            }
        })
    }

    /**
     * 
     * @param {number} transaction_id 
     * @returns {Promise<void>}
     */
    async delete(transaction_id){
        await transaction.destroy({
            where: {
                id: transaction_id
            }
        })
    }

    /**
     * 
     * @param {number} reff_id 
     * @returns {Promise<transaction>}
     */
    async checkReffId(reff_id){
        const result = await transaction.findOne({
            where: {
                reff_id: reff_id
            },
            attributes: ["id"]
        })
        return result;
    }
}

module.exports = new TransactionRepository()