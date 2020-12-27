const { body } = require('express-validator');
const readJson = require('../helpers/readJson');
const path = require('path');
const bcryptjs = require('bcryptjs');

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
                const users = readJson();

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
            .custom((value, { req }) => value == req.body.retype)
            .withMessage('Las contraseñas no coinciden'),
        body('retype')
            .notEmpty()
            .withMessage('Debe ingresar nuevamente su contraseña'),
        body('avatar')
            .custom((value, { req }) => req.files[0])
            .withMessage('El avatar es obligatorio')
            .bail()
            .custom((value , { req }) => {
                const acceptedExtensions = ['.jpg', '.png', '.jpeg'];
                const fileExt = path.extname(req.files[0].originalname);
                return acceptedExtensions.includes(fileExt);
            })
            .withMessage('Sólo se permiten archivos de extensión .jpg, .png y .jpeg, intente nuevamente.')
    ],
    login: [
        body('email')
            .notEmpty()
            .withMessage('El campo email es obligatorio')
            .bail()
            .isEmail()
            .withMessage('Email con formato incorrecto')
            .bail()
            .custom((value, { req }) => {
                const allUsers = readJson();
                const userFound = allUsers.find(user => value == user.email);
        
                if(userFound){
                    if(bcryptjs.compareSync(req.body.password, userFound.password)){
                        return true;
                    }
                    return false;
                }
                
                return false;
            })
            .withMessage('Email o contraseña inválidos')
    ]
}