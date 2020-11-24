const express = require('express');
const router = express.Router();
const multer = require('multer');

const validator = require('../middlewares/validator');

const userController = require('../controllers/userController');

// Multer config

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname);
    }
})

var upload = multer({ storage: storage })

// Muestra la vista de registro
router.get('/register', userController.showRegister);

// Procesa la vista de registro
router.post('/register', upload.any(), validator.register, userController.processRegister);

// Muestra la vista de login
router.get('/login', userController.showRegister);

// Procesa la vista de login
router.post('/login', userController.processRegister);

module.exports = router;