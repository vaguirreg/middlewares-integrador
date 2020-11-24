const { body } = require('express-validator');
const userHelper = require('../helpers/userHelper');
const path = require('path');

module.exports = {
    register: [
        body('email')
            .notEmpty()
            .withMessage('El campo email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Email con formato incorrecto')
            .bail()
            .custom(emailValue => {
                const users = userHelper.leerJson();

                const userFound = users.find(user => user.email == emailValue);

                return !userFound;
            })
            .withMessage('Email ya registrado'),
        body('password')
            .notEmpty()
            .withMessage('El campo password es obligatorio')
            .bail()
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres')
            .bail()
            .custom((value, req) => value == req.retype)
            .withMessage('Las contraseñas no coinciden'),
        body('retype')
            .notEmpty()
            .withMessage('Es obligatorio repetir la contraseña'),
        body('avatar')
            .notEmpty()
            .withMessage('El avatar es obligatorio')
            .bail()
            .custom(value => {
                const acceptedExtensions = ['.jpg', '.png', '.jpeg'];
                const fileExt = path.extname(value);
                return acceptedExtensions.includes(fileExt);
            })
            .withMessage('Extensión inválida. Las extensiones aceptadas son: JPG, PNG Y JPEG')
    ]
}