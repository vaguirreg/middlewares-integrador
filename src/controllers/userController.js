const { validationResult } = require('express-validator');

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