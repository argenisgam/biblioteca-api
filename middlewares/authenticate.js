const jwt = require("jsonwebtoken");
const SystemError = require("../errors/SystemError");

const authenticate = (req, res, next) => {
    const authHeader = req.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Debe iniciar sesión." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return next(new SystemError("JWT_SECRET no está configurado."));
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
        return res.status(401).json({ success: false, message: "Token inválido." });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "La sesión no es válida o ha expirado." });
    }
};

module.exports = authenticate;