'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('materials', [
      {
        material_name: "Pasir",
        vendor_id: 1,
        stock: 100,
        status: "AVAILABLE",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        material_name: "Batako",
        vendor_id: 1,
        stock: 100,
        status: "EMPTY",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        material_name: "Bata",
        vendor_id: 2,
        stock: 100,
        status: "AVAILABLE",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        material_name: "Semen",
        vendor_id: 2,
        stock: 100,
        status: "AVAILABLE",
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
