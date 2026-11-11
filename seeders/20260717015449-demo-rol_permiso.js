'use strict';

const { PERMISSIONS } = require('../constants/permissions');

module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = await queryInterface.sequelize.query(
      'SELECT id, nombre FROM permisos',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const roles = await queryInterface.sequelize.query(
      'SELECT id, nombre FROM roles',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const adminRole = roles.find((role) => role.nombre === 'Administrador');
    const userRole = roles.find((role) => role.nombre === 'Usuario');
    const catalogPermission = permissions.find((permission) => permission.nombre === PERMISSIONS.BOOK_READ);

    if (!adminRole || !userRole || !catalogPermission) {
      throw new Error('Primero crea los roles y permisos de biblioteca.');
    }

    const now = new Date();
    const relationships = [
      ...permissions.map((permission) => ({
        rol_id: adminRole.id,
        permiso_id: permission.id,
        createdAt: now,
        updatedAt: now
      })),
      {
        rol_id: userRole.id,
        permiso_id: catalogPermission.id,
        createdAt: now,
        updatedAt: now
      }
    ];

    await queryInterface.bulkInsert('rol_permisos', relationships);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('rol_permisos', null, {});
  }
};
