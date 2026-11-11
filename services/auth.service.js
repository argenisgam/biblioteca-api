const bcrypt = require("bcrypt");
const { User, Rol, Permiso } = require("../models");
const sequelize = require("../config/database");
const Usuario = require("../models/Usuarios");
const BusinessError = require('../errors/BusinessError');
const UnauthorizedError = require("../errors/UnauthorizedError");
const token = require("../utils/jwt");

const sessionFor = (user) => {
  if (!user.Rol) {
    throw new Error("La cuenta no tiene un rol asignado.");
  }
  const identity = {
    id: user.id,
    username: user.username,
    email: user.email,
    rol: user.Rol.nombre,
    permisos: user.Rol.Permisos.map((permission) => permission.nombre)
  };
  return { token: token.generateToken(identity), user: identity };
};

const login = async ({ email, password }) => {
  if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
    throw new BusinessError("Ingresa el correo electrónico y la contraseña.");
  }
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    include: [
    {
      model: Rol,
      include: [Permiso],
    }],
    where: { email: normalizedEmail },
  });
  if (!user) {
    throw new UnauthorizedError("Credenciales inválidas.");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new UnauthorizedError("Credenciales inválidas.");
  }
  return sessionFor(user);
};

const register = async ({ nombre, username, email, password } = {}) => {
  const readerName = typeof nombre === "string" ? nombre.trim() : "";
  const accountName = typeof username === "string" ? username.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!readerName || !accountName || !normalizedEmail || typeof password !== "string" || !password) {
    throw new BusinessError("Completa el nombre, el usuario, el correo y la contraseña.");
  }
  if (readerName.length > 255) {
    throw new BusinessError("El nombre no puede superar 255 caracteres.");
  }
  if (!/^[a-zA-Z0-9._-]{3,50}$/.test(accountName)) {
    throw new BusinessError("El usuario debe tener entre 3 y 50 caracteres: letras, números, punto, guion o guion bajo.");
  }
  if (password.length < 12) {
    throw new BusinessError("La contraseña debe tener al menos 12 caracteres.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new BusinessError("Ingresa un correo electrónico válido.");
  }

  try {
    return await sequelize.transaction(async (transaction) => {
      const readerRole = await Rol.findOne({
        where: { nombre: "Usuario" },
        include: [{ model: Permiso }],
        transaction
      });
      if (!readerRole) {
        throw new Error("No existe el rol Usuario. Inicializa los roles de la aplicación antes de aceptar registros.");
      }

      const user = await User.create({
        username: accountName,
        email: normalizedEmail,
        password,
        rol_id: readerRole.id
      }, { transaction });
      await Usuario.create({
        nombre: readerName,
        correo: normalizedEmail
      }, { transaction });

      user.Rol = readerRole;
      return sessionFor(user);
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new BusinessError("Ya existe una cuenta o un lector con ese usuario o correo.");
    }
    throw error;
  }
};

module.exports = {
  login,
  register
};
