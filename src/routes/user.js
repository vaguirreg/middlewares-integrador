const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Muestra la vista de registro
router.get('/register', userController.showRegister);

// Procesa la vista de registro
router.post('/register', userController.processRegister);

// Muestra la vista de login
router.get('/login', userController.showLogin);

// Procesa la vista de login
router.post('/login', userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', userController.showProfile);

// Cierra la sesión
router.get('/logout', userController.logout);

module.exports = router;