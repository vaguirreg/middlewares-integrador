const readJson = require('../helpers/readJson');

module.exports = (req, res, next) => {
    if (!req.session.user && req.cookies.user){
        const allUsers = readJson();
        const userFound = allUsers.find(user => user.id == req.cookies.user);
        req.session.user = userFound;
    }
    return next();
}