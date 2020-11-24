const readJson = require('../helpers/readJson');

module.exports = (req, res, next) => {
    
    if(req.session.user){
        return next();
    } else if (req.cookies.user){
        const allUsers = readJson();
        const userFound = allUsers.find(user => user.id == req.cookies.user);
        if(!userFound){
            console.log('Cookie creada pero el usuario no se encontró con ese id');
        }
        req.session.user = userFound;
        return next();
    } else {
        return next();
    }

}