const authService = require("../services/auth.service");
const login = async (req, res, next) => {
  try {
    const session = await authService.login(req.body || {});
    return res.status(200).json({
      message: "Inicio de sesión exitoso.",
      ...session
    });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const session = await authService.register(req.body || {});
    return res.status(201).json({
      message: "Cuenta creada correctamente.",
      ...session
    });
  } catch (error) {
    return next(error);
  }
};

const currentUser = (req, res) => {
  const { id, username, email, rol, permisos } = req.user;
  return res.json({ id, username, email, rol, permisos });
};

module.exports = { login, register, currentUser };
