const { validationResult } = require('express-validator');
const generateId = require('../helpers/generateId');
const writeJson = require('../helpers/writeJson');
const bcrypt = require('bcryptjs');
const readJson = require('../helpers/readJson');

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
        return res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
        // Do the magic
        const results = validationResult(req);

        if (!results.isEmpty()) {
            return res.render("user/user-login-form", {
                errors: results.errors,
                old: req.body
            });
        }

        const userFound = readJson().find(user => user.email == req.body.email);

        req.session.user = userFound;

        if (req.body.remember){
            res.cookie('user', userFound.id, { maxAge: 1000 * 60 * 60 });
        }

        return res.redirect('/');
    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
        if(req.cookies.user){
            res.clearCookie('user');
        }
        req.session.destroy();
        return res.redirect('/');
    }

}