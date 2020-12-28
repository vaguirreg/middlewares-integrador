const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validator = require('../../middlewares/validator');
const auth = require('../../middlewares/auth');
const guest = require('../../middlewares/guest');
const helper = require('../../helpers/helpers');

// Muestra la vista de registro
router.get('/register', guest, userController.showRegister);

// Procesa la vista de registro
router.post('/register', guest, helper.uploadUser().any(), validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login', guest, userController.showLogin);

// Procesa la vista de login
router.post('/login', guest, validator.login, userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', auth, userController.showProfile);

// Cierra la sesión
router.get('/logout', auth, userController.logout);

module.exports = router;

