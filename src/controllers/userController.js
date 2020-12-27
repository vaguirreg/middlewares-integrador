const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const helper = require('../../helpers/helpers');


module.exports = {

    //hecho
    showRegister: (req, res) => {
        return res.render('user/user-register-form'); 
    },

    //chequear
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render('user/user-register-form', {errors: errors.errors, old: req.body})
        } else {
           
        const newUser = {
            id: helper.generateNewIdUsers(),
            name: req.body.name,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.files[0].filename,
        }
    
        const users = helper.getAllUsers();
        const saveUser = [...users, newUser];
        helper.writeUsers(saveUser);
    
        res.redirect('/user/login');
    }},

    //hecho
    showLogin: (req, res) => {
        return res.render('user/user-login-form'); 
    },

    //chequear
    processLogin: (req, res) => {
            const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render('user/user-login-form', {errors: errors.errors, old: req.body
            });
        }
        req.session.email = req.body.email;			
        
        if (req.body.recordame){
            res.cookie('email', req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 365 });
        };
        res.redirect('/');	
    },

    //hecho
    showProfile: (req, res) => { 
        return res.render('user/profile'); 
    },

    //hecho
    logout: (req, res) => { 
        if(req.cookies.email){
            res.clearCookie('email');
        }
        req.session.destroy();
        return res.redirect('/');
    }

}