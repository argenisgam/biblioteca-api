const logger = require("../utils/logger");
const BusinessError = require("../errors/BusinessError");
const SystemError = require("../errors/SystemError");

const handleError = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const statusCode = err instanceof BusinessError || err instanceof SystemError
    ? err.statusCode
    : err.statusCode >= 400 && err.statusCode < 500 ? err.statusCode : 500;
  const message = statusCode < 500 ? err.message : "Error interno del servidor";

  if (statusCode < 500) logger.warn(err.message);
  else logger.error(err);

  return res.status(statusCode).json({ success: false, message });
};

module.exports = handleError;