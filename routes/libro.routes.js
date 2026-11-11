const express=require('express');
const router=express.Router();
const libroController= require('../controllers/libro.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { PERMISSIONS } = require('../constants/permissions');

router.use(authenticate);
router.get('/', authorize(PERMISSIONS.BOOK_READ), libroController.getAll);
router.get('/:id', authorize(PERMISSIONS.BOOK_READ), libroController.getById);
router.post('/', authorize(PERMISSIONS.BOOK_CREATE), libroController.create);
router.put('/:id', authorize(PERMISSIONS.BOOK_UPDATE), libroController.update);
router.delete('/:id', authorize(PERMISSIONS.BOOK_DELETE), libroController.delete);
module.exports=router;