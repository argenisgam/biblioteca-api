const logger = require("../utils/logger");
const BusinessError = require("../errors/BusinessError");
const SystemError = require("../errors/SystemError");

const handleError = (err, req, res, next) => {

  if (err instanceof BusinessError) {

    logger.warn(err.message);

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

  }

  if (err instanceof SystemError) {

    logger.error(err.message);

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

  }


  logger.error(err.message);

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });

};

module.exports = handleError;