const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authenticate, authController.currentUser);

module.exports = router;