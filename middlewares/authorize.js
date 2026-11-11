const authorize = (requiredPermissions = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Debe iniciar sesión." });
        }

        const required = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
        const granted = Array.isArray(req.user.permisos) ? req.user.permisos : [];
        if (required.length === 0) return next();

        const tienePermiso = required.some((permiso) => granted.includes(permiso));
        if (!tienePermiso) {
            return res.status(403).json({ success: false, message: "No tiene permisos para realizar esta acción." });
        }
        return next();
    };
};

module.exports = authorize;