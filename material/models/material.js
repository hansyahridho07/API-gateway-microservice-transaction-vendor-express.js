'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      material.belongsTo(models.vendor, {
        foreignKey: {
          name: "vendor_id"
        }
      })
    }
  }
  material.init({
    material_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3
      }
    },
    vendor_id: {
      type: DataTypes.NUMBER,
      validate: {
        isNumeric: true
      }
    },
    stock: {
      type: DataTypes.NUMBER,
      defaultValue: 1,
      validate: {
        isNumeric: true
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'material',
    tableName: 'materials',
    underscored: true,
  });
  sequelizePaginate.paginate(material)
  return material;
};