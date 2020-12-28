const helper = require("../helpers/helpers");

module.exports = (req, res, next) => {
    if (!req.session.user && req.cookies.user){
        const userFound = helper.getAllUsers().find(user => user.id == req.cookies.user);
        req.session.user = userFound;
    }
    return next();
}