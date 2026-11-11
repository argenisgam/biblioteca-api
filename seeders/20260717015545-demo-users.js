'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const { ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_EMAIL, ADMIN_INITIAL_PASSWORD } = process.env;
    if (!ADMIN_INITIAL_USERNAME || !ADMIN_INITIAL_EMAIL || !ADMIN_INITIAL_PASSWORD) {
      throw new Error('Define ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_EMAIL y ADMIN_INITIAL_PASSWORD para crear la cuenta inicial.');
    }
    if (ADMIN_INITIAL_PASSWORD.length < 12) {
      throw new Error('ADMIN_INITIAL_PASSWORD debe tener al menos 12 caracteres.');
    }

    const roles = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE nombre = ?',
      { replacements: ['Administrador'], type: Sequelize.QueryTypes.SELECT }
    );
    if (!roles.length) throw new Error('Primero crea el rol Administrador.');

    await queryInterface.bulkInsert('Users', [{
      username: ADMIN_INITIAL_USERNAME.trim(),
      email: ADMIN_INITIAL_EMAIL.trim().toLowerCase(),
      password: await bcrypt.hash(ADMIN_INITIAL_PASSWORD, 12),
      rol_id: roles[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    const email = process.env.ADMIN_INITIAL_EMAIL;
    if (!email) throw new Error('Define ADMIN_INITIAL_EMAIL para eliminar la cuenta inicial.');
    await queryInterface.bulkDelete('Users', { email: email.trim().toLowerCase() });
  }
};
