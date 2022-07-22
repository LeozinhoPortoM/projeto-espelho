const express = require("express");
const router = express.Router();

// Controllers
const authController = require('../controllers/AuthController');

// Middlewares
const validator = require('../middlewares/validatorRegisterMiddleware');


// Rota para página login
router.get("/login", authController.login);
router.post("/login", authController.auth);

// Rota para página registrar
router.get("/register", authController.register);
router.post("/register", authController.create);

module.exports = router;