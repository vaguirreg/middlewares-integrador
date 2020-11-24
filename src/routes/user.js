const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');

const userController = require('../controllers/userController');

// Muestra la vista de registro
router.get('/register', userController.showRegister);

// Procesa la vista de registro
router.post('/register', validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login', userController.showRegister);

// Procesa la vista de login
router.post('/login', userController.processRegister);

module.exports = router;