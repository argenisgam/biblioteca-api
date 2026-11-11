'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const userColumns = await queryInterface.describeTable('usuarios');
    if (userColumns.email && !userColumns.correo) {
      await queryInterface.renameColumn('usuarios', 'email', 'correo');
    } else if (!userColumns.correo) {
      throw new Error('La tabla usuarios debe tener una columna email o correo.');
    }

    await queryInterface.createTable('prestamos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'libros',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      fecha_prestamo: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fecha_devolucion: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('prestamos');
    const userColumns = await queryInterface.describeTable('usuarios');
    if (userColumns.correo && !userColumns.email) {
      await queryInterface.renameColumn('usuarios', 'correo', 'email');
    }
  }
};
