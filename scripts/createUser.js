require('dotenv').config();

const sequelize = require('../config/database');
const { User, Rol } = require('../models');

async function createUser() {
  const username = process.env.USER_INITIAL_USERNAME?.trim();
  const email = process.env.USER_INITIAL_EMAIL?.trim().toLowerCase();
  const password = process.env.USER_INITIAL_PASSWORD;

  if (!username || !email || !password) {
    throw new Error('Define USER_INITIAL_USERNAME, USER_INITIAL_EMAIL y USER_INITIAL_PASSWORD en el entorno local.');
  }
  if (password.length < 12) {
    throw new Error('USER_INITIAL_PASSWORD debe tener al menos 12 caracteres.');
  }

  const role = await Rol.findOne({ where: { nombre: 'Usuario' } });
  if (!role) throw new Error('Ejecuta primero npm run admin:create para inicializar los roles.');

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Ya existe una cuenta con USER_INITIAL_EMAIL; no se modificó.');
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) throw new Error('Ya existe una cuenta con USER_INITIAL_USERNAME; no se modificó.');

  await User.create({ username, email, password, rol_id: role.id });
  console.log('Cuenta de usuario creada.');
}

createUser()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
