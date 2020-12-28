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
        } 
           
        const newUser = {
            id: helper.generateNewIdUsers(),
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.files[0].filename,
        }
        
        const users = helper.getAllUsers();
        const saveUser = [...users, newUser];
        helper.writeUsers(saveUser);
    
        res.redirect('/user/login');
    },

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
        
        const users = helper.getAllUsers()
        const userFound = users.find(user => user.email == req.body.email)

        req.session.email = userFound			
        
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