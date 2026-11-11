const express=require('express');
const router=express.Router();
const prestamoController=require('../controllers/prestamo.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { PERMISSIONS } = require('../constants/permissions');

router.use(authenticate);
router.get('/', authorize(PERMISSIONS.LOAN_READ), prestamoController.getAll);
router.get('/:id', authorize(PERMISSIONS.LOAN_READ), prestamoController.getById);
router.post('/', authorize(PERMISSIONS.LOAN_CREATE), prestamoController.create);
router.put('/devolver/:id', authorize(PERMISSIONS.LOAN_RETURN), prestamoController.devolucion);
module.exports=router;