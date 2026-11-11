'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
await queryInterface.createTable("libros", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false
    },
    anio: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('libros');
  }
};
