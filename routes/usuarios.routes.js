const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controllers');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { PERMISSIONS } = require('../constants/permissions');

router.use(authenticate);
router.get('/', authorize(PERMISSIONS.READER_READ), usuarioController.getAll);
router.get('/:id', authorize(PERMISSIONS.READER_READ), usuarioController.getById);
router.post('/', authorize(PERMISSIONS.READER_CREATE), usuarioController.create);
router.put('/:id', authorize(PERMISSIONS.READER_UPDATE), usuarioController.update);
router.delete('/:id', authorize(PERMISSIONS.READER_DELETE), usuarioController.delete);
module.exports = router;