var passport = require('passport');
var localStrategy = require('passport-local').Strategy();

//serialize and deserialize
passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

//middleware
passport.use('local-login', new localStrategy({
    userNameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done {
    user.findbyId({email: email}, function(err, user){
    if(err) return done(err);
    
    if(!user) {
        return done(null, false, req.flash('loginMessage', 'User not found'))
    }
    if(!user.comparePassword(password)) {
        return done(null, false, req,flash('loginMessage', 'Incorrect Password, try again'));
    }
    
    return done(null, user);
});
}));


//custom function to validate
exports.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
