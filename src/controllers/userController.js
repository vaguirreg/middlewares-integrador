const { validationResult } = require('express-validator');
const generateId = require('../helpers/generateId');
const writeJson = require('../helpers/writeJson');
const bcrypt = require('bcryptjs');

module.exports = {
    showRegister: (req, res) => {
        // Do the magic
        return res.render('user/user-register-form');
    },
    processRegister: (req, res) => {
        // Do the magic
        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render("user/user-register-form", {
                errors: results.errors,
                old: req.body
            });
        }

        const user = {
            id: generateId(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.files[0].filename
        }

        writeJson(user);

        return res.redirect('/user/login');
    },
    showLogin: (req, res) => {
        // Do the magic
        return res.send('Do the magic');
    },
    processLogin: (req, res) => {
        // Do the magic
        return res.send('Do the magic');
    }

}