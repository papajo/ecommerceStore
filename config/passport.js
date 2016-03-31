var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var secret = require('../config/secret');
var User = require('../models/user');
var async = require('async');
var Cart = require('../models/cart');

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
}, function(req, email, password, done) {
    user.findById({email: email}, function(err, user){
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

passport.use(new FacebookStrategy(secret.facebook, function(token, refreshToken, profile, done){
    User.findOne({ facebook: profile.id }, function(err, user){
        if(err) return done(err);
        
        if(user){
            return done(null, user);
        } else {
            async.waterfall([
                function(callback){
                    var newUser = new User();
                    newUser.email = profile._json.email;
                    newUser.facebook = profile.id;
                    newUser.tokens.push({ kind: 'facebook', token: token })
                    newUser.profile.name = profile.displaName;
                    newUser.profile.picture = 'https://graph.facebook.com/' + profile.id + 'picture?type=large';

                    newUser.save(function(err){
                        if (err) throw err;

                        callback(err, newUser);
                    });
                },
                
                function(newUser){
                    var cart = new Cart();
                    cart.owner = newUser._id;
                    cart.save(function(err){
                        if (err) return done(err);
                        return done(err, newUser);
                    });
                }
            ])
        }
    })
}))


//custom function to validate
exports.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
