const authService = require("../services/auth.service");
const login = async (req, res) => {
try{
    const token = await authService.login(req.body);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
    }catch(err){
     console.error("Mensaje:", err.message);

      if (err.parent) {
          console.error("Base de datos:", err.parent.message);
      }

      if (err.original) {
          console.error("Original:", err.original.message);
      }
      res.status(500).json({
            mensaje:error.message
        });
    }

};
module.exports = {
  login,
};
