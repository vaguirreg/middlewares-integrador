module.exports = (req, res, next) => {
    if(req.session.email){
        return next();
    }
    return res.redirect('/user/login');
}