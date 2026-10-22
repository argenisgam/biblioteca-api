const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Rol= require("../models/Rol")
const Permiso= require("../models/Permiso")
const token=require("../utils/jwt");
const login = async ({ email, password }) => {
  const user = await User.findOne({
    include: [
    {
      model: Rol,
      include: [Permiso],
    }],
    where: { email },
  });
  if (!user) {
    throw new Error("Credenciales inválidas");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Credenciales inválidas");
  }
  const permisos = user.Rol.Permisos.map((permiso) => permiso.nombre);
  return token.generateToken({
    id: user.id,
    rol: user.Rol.nombre,
    permisos
  });
};
module.exports = {
  login,
};
