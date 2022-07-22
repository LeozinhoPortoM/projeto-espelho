const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/UserController');

// Middlewares
const upload = require('../middlewares/multer');
const validator = require('../middlewares/validatorRegisterMiddleware');

// Criar usuário
router.get("/create", userController.create);
router.post("/create", upload.single('avatar'), userController.store);

// Editar usuário
router.get("/edit/:id", userController.edit);
router.put("/edit/:id", upload.single('avatar'), userController.update);

// Deletar usuário
router.get("/delete/:id", userController.delete);
router.delete("/delete/:id", userController.destroy);

// Login de usuário
router.get("/login", userController.loginForm);
// router.post('/login', userController.loginUser);

// Visualizar usuário
router.get("/", userController.index);
router.get('/:id', userController.show);


module.exports = router;