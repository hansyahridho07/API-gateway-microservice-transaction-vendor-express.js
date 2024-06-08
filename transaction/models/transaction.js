'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    customer: {
      type: DataTypes.JSON,
      allowNull: false
    },
    vendor: {
      type: DataTypes.JSON,
      allowNull: false
    },
    material: {
      type: DataTypes.JSON,
      allowNull: false
    },
    reff_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
    tableName: 'transactions',
    underscored: true
  });
  sequelizePaginate.paginate(transaction)
  return transaction;
};