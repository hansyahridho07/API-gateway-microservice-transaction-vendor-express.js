'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer: {
        type: Sequelize.JSON,
        allowNull: false
      },
      vendor: {
        type: Sequelize.JSON,
        allowNull: false
      },
      material: {
        type: Sequelize.JSON,
        allowNull: false
      },
      reff_id: {
        type: Sequelize.STRING,
        unique: true
      },
      status: {
        type: Sequelize.ENUM(["PENDING","SUCCESS","FAILED"]),
        defaultValue: "PENDING"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};