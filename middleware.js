// not to get to some page if you are not logged in 
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
}
