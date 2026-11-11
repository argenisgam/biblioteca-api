const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Permiso = sequelize.define("Permiso", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
    tableName: 'permisos',
    timestamps: true,
  }
);

module.exports = Permiso;