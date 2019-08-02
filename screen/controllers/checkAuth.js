exports.checkAuth=function(req, res, next) {
    if (req.session.userName){
        next();
    } else{
        res.redirect('/client/login');
    }
}