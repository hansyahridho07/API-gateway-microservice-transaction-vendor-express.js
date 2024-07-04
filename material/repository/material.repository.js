'use strict'

const { material, vendor } = require("../models/index")
class MaterialRepository {
    /**
     * 
     * @param {Object} createMaterialDto
     * @param {string} createMaterialDto.material_name
     * @param {number} createMaterialDto.vendor_id
     * @param {number} createMaterialDto.stock
     * @param {string} createMaterialDto.status
     * @returns {Primise<void>}
     */
    async create(createMaterialDto){
        await material.create(createMaterialDto)
    }
     /**
      * 
      * @param {number} material_id
      * @returns {Promise<material>}
      */
    async findOne(material_id){
        let check = await material.findByPk(material_id,{
            attributes: ["id","material_name","stock","status"],
            include: {
                model: vendor,
                attributes: ["id","name","address"]
            }
        })
        check = JSON.parse(JSON.stringify(check))
        return check
    }

    /**
     * 
     * @param {Object} where
     * @param {string} where.material_name
     * @param {number} where.vendor_id
     * @param {number} where.stock
     * @param {string} where.status
     * @param {number} page 
     * @param {number} pageSize
     * @returns {Promise<{docs: Array, page: number, totalPage: number, total: number}[]>}
     */

    async findAll(where, {page, pageSize}) {
        const options = {
            attributes: ["id","material_name","stock","status"],
            include: {
                model: vendor,
                attributes: ["id","name","address"]
            },
            page: page,
            paginate: pageSize,
            order: [["id","desc"]],
            where: {...where}
        }
        const result = await material.paginate(options)
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
     * @param {Object} updateMaterialDto
     * @param {string?} updateMaterialDto.material_name
     * @param {number?} updateMaterialDto.vendor_id
     * @param {number?} updateMaterialDto.stock
     * @param {string?} updateMaterialDto.status
     * @param {number} id
     * @returns {Promise<void>}
     */
    async update(updateMaterialDto, id) {
        await material.update(updateMaterialDto, {where:{id:id}})
    }

    /**
     * 
     * @param {number} material_id 
     * @returns {Promise<void>}
     */

    async delete(material_id) {
        await material.destroy({where: {id:material_id}})
    }
}

module.exports = new MaterialRepository()