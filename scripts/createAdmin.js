require('dotenv').config();

const sequelize = require('../config/database');
const { User, Rol, Permiso } = require('../models');
const { PERMISSIONS, PERMISSION_DEFINITIONS } = require('../constants/permissions');

async function createAdmin() {
  const username = process.env.ADMIN_INITIAL_USERNAME?.trim();
  const email = process.env.ADMIN_INITIAL_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!username || !email || !password) {
    throw new Error('Define ADMIN_INITIAL_USERNAME, ADMIN_INITIAL_EMAIL y ADMIN_INITIAL_PASSWORD en el entorno local.');
  }
  if (password.length < 12) {
    throw new Error('ADMIN_INITIAL_PASSWORD debe tener al menos 12 caracteres.');
  }

  const [adminRole] = await Rol.findOrCreate({
    where: { nombre: 'Administrador' },
    defaults: { descripcion: 'Gestiona libros, lectores y préstamos.' }
  });
  const [readerRole] = await Rol.findOrCreate({
    where: { nombre: 'Usuario' },
    defaults: { descripcion: 'Puede consultar el catálogo de libros.' }
  });

  const permissions = await Promise.all(PERMISSION_DEFINITIONS.map(([nombre, descripcion]) =>
    Permiso.findOrCreate({ where: { nombre }, defaults: { descripcion } }).then(([permission]) => permission)
  ));
  await adminRole.setPermisos(permissions);
  await readerRole.setPermisos(permissions.filter((permission) => permission.nombre === PERMISSIONS.BOOK_READ));

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Ya existe una cuenta con ADMIN_INITIAL_EMAIL; no se modificó.');
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) throw new Error('Ya existe una cuenta con ADMIN_INITIAL_USERNAME; no se modificó.');

  await User.create({ username, email, password, rol_id: adminRole.id });
  console.log('Cuenta de administrador creada.');
}

createAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
