'use strict'

const { vendor, material } = require("../models/index")

module.exports = class VendorRepository{
    /**
     * 
     * @param {Object} createVendorDto
     * @param {string} createVendorDto.name
     * @param {string} createVendorDto.address
     * @returns {Promise<void>} 
     */
    async create(createVendorDto){
        await vendor.create(createVendorDto)
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<vendor>}
     */
    async findOne(id){
        let check = await vendor.findOne({
            where: {id: id},
            attributes: ["id","name","address"]
        })
        check = JSON.parse(JSON.stringify(check))
        return check
    }

    /**
     * 
     * @param {any} where 
     * @param {number} page
     * @param {number} pageSize 
     * @returns {Promise<vendor[]>}
     */
    async findAll(where, {page, pageSize}){
        const options = {
            attributes: ["id","name","address"],
            include: {
                model: material,
                attributes: ["id","material_name","stock"],
                separate: true,
                limit: 3
            },
            page: page,
            paginate: pageSize,
            order: [["id","desc"]],
            where: {...where}
        }
        const result = await vendor.paginate(options)
        const output = {
            docs: result.docs,
            page: page,
            totalPage: result.pages,
            total: result.total
        }
        return output
    }

    /**
     * @param {Object} updateData
     * @param {string?} updateData.name
     * @param {string?} updateData.address
     * @param {number} id 
     * @returns {Promise<void>}
     */
    async update(updateData, id){
        await vendor.update(updateData, {where:{ id: id }})
    }

    /**
     * @param {number} id
     * @description Delete vendor with where condition is id
     * @returns {Promise<void>}
     */
    async delete(id) {
        await vendor.destroy({where:{id:id}})
    }
}