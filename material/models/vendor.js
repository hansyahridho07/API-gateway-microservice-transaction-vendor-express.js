'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vendor.hasMany(models.material,
        {
          foreignKey: {
            name: 'vendor_id'
          }
        }
      )
    }
  }
  vendor.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vendor',
    tableName: 'vendors',
    underscored: true
  });
  sequelizePaginate.paginate(vendor)
  return vendor;
};