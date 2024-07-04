'use strict'

const { Op } = require("sequelize")
const DefaultResponse = require("../helpers/generate_response")
const materialRepository = require("../repository/material.repository")
const VendorRepository = require("../repository/vendor.repository")
const vendorRepository = new VendorRepository()

class MaterialService {
    /**
     * 
     * @param {Object} createMaterialDto
     * @param {string} createMaterialDto.material_name
     * @param {number} createMaterialDto.vendor_id
     * @param {number} createMaterialDto.stock
     * @param {string} createMaterialDto.status
     * @returns {Promise<DefaultResponse>} 
     */
    async create(createMaterialDto){
        const check_vendor = await vendorRepository.findOne(createMaterialDto.vendor_id)
        const output = new DefaultResponse(true, 201, 'success create material')
        if(!check_vendor){
            output.message = "vendor not found"
            return output.getNotFoundResponse()
        }
        await materialRepository.create(createMaterialDto)
        
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {number} material_id 
     * @returns {Promise<DefaultResponse>}
     */
    async findOne(material_id){
        const check = await materialRepository.findOne(material_id)
        const output = new DefaultResponse(true, 200, 'success get material')
        if(!check){
            output.message = 'material not found'
            return output.getNotFoundResponse()
        }
        output.data = {...check}
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {Object} whereCondition
     * @param {string?} whereCondition.material_name
     * @param {number?} whereCondition.vendor_id
     * @param {string?} whereCondition.status
     * @param {number} whereCondition.page - Default 1
     * @param {number} whereCondition.size - Default 10
     */
    async findAll(whereCondition) {
        const {material_name, vendor_id, status, page = 1, size = 10} = whereCondition
        const objWhere = {}

        if(material_name){
            objWhere.material_name = {
                [Op.like]: `%${material_name}%`
            }
        }

        if(vendor_id) objWhere.vendor_id = vendor_id
        if(status) objWhere.status = status
        const result = await materialRepository.findAll(objWhere, {page:+page, pageSize:+size})
        const output = new DefaultResponse(true, 200, 'success get materials', result)
        return output.getSuccessResponse()
    }   

    /**
     * 
     * @param {Object} updateMaterialDto
     * @param {string} updateMaterialDto.material_name
     * @param {number} updateMaterialDto.vendor_id
     * @param {number} updateMaterialDto.stock
     * @param {string} updateMaterialDto.status
     * @param {number} id
     * @returns {Promise<DefaultResponse>} 
     */
    async update(updateMaterialDto, id) {
        const { material_name, vendor_id, stock, status } = updateMaterialDto
        const output = new DefaultResponse(true, 200, 'success update material')
        const updateData = {}

        const check = await materialRepository.findOne(id)
        if(!check){
            output.message = 'material not found'
            return output.getNotFoundResponse()
        }

        if(material_name) updateData.material_name = material_name
        if(vendor_id) updateData.vendor_id = vendor_id
        if(stock) updateData.stock = stock
        if(status) updateData.status = status

        await materialRepository.update(updateData, id)
        return output.getSuccessResponse()
    }

    /**
     * 
     * @param {number} material_id 
     * @returns {Promise<DefaultResponse>}
     */
    async delete(material_id) {
        const check = await materialRepository.findOne(material_id)
        const output = new DefaultResponse(true, 200, 'success delete material')
        
        if(!check){
            output.message = 'material not found'
            return output.getNotFoundResponse()
        }

        await materialRepository.delete(material_id)
        return output.getSuccessResponse()
    }
}

module.exports = new MaterialService()