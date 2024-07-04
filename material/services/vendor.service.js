'use strict'

const { Op } = require("sequelize")
const DefaultResponse = require("../helpers/generate_response")
const VendorRepository = require("../repository/vendor.repository")
const vendorRepository = new VendorRepository()

module.exports = class VendorService {
    /**
     * 
     * @param {Object} createVendorDto
     * @param {string} createVendorDto.name
     * @param {string} createVendorDto.address
     * @returns {Promise<DefaultResponse>} 
     */
    async create(createVendorDto) {
        await vendorRepository.create(createVendorDto)
        const output = new DefaultResponse(true, 201, 'success create vendor')
        return output.getSuccessResponse()
    }

    async findOne(id){
        const output = new DefaultResponse(true, 200, 'success get data vendor')
        const check = await vendorRepository.findOne(id)
        if(!check){
            output.message = "vendor not found"
            return output.getNotFoundResponse()
        }

        output.data = {...check}
        return output.getSuccessResponse()
    }
    /**
     * 
     * @param {Object} whereCondition
     * @param {string} whereCondition.name
     * @param {string} whereCondition.address
     * @returns {Promise<DefaultResponse>} 
     */
    async findAll(whereCondition){
        const {name, address, page, size} = whereCondition
        const objWhere = {}
        if(name){
            objWhere.name = {
                [Op.like]: `%${name}%`
            }
        }
        if(address){
            objWhere.address = {
                [Op.like]: `%${address}%`
            }
        }
        const result = await vendorRepository.findAll(objWhere,{page:+page,pageSize:+size})
        const output = new DefaultResponse(true, 200, 'success get many data vendor', result)
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {Object} updateVendorDto
     * @param {string} updateVendorDto.name
     * @param {string} updateVendorDto.address 
     * @param {number} id
     * @returns {Promise<DefaultResponse>} 
     */
    async update(updateVendorDto, id) {
        const { name, address } = updateVendorDto
        const check = await vendorRepository.findOne(id)
        const output = new DefaultResponse(true, 200, 'success update vendor')
        const updateData = {}

        if(!check){
            output.message = "vendor not found"
            return output.getNotFoundResponse()
        }

        if(name) updateData.name = name
        if(address) updateData.address = address

        await vendorRepository.update(updateData, id)

        return output.getSuccessResponse()
    }

    /**
     * @param {number} id
     * @returns {Promise<DefaultResponse>} 
     */
    async delete(id) {
        const check = await vendorRepository.findOne(id)
        const output = new DefaultResponse(true, 200, 'success delete vendor')

        if(!check){
            output.message = "vendor not found"
            return output.getNotFoundResponse()
        }

        await vendorRepository.delete(id)

        return output.getSuccessResponse()
    }
}