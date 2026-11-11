'use strict';

const { PERMISSION_DEFINITIONS } = require('../constants/permissions');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('permisos', PERMISSION_DEFINITIONS.map(([nombre, descripcion]) => ({
      nombre,
      descripcion,
      createdAt: now,
      updatedAt: now
    })));
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permisos', null, {});
  }
};
