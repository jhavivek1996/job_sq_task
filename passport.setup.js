const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// const userController = require('..//user.controller');

passport.serializeUser(function(user,cb){
    cb(null,user.id);
})
passport.deserializeUser(function(id,done){
    cb(err,user)
})


passport.use(new GoogleStrategy({
    clientID: "",  //please put your client id
    clientSecret: "",////please put your client secret
    callbackURL:"http://localhost:4200/google/callback"
},
function(accessToken,refreshToken,profile,cb){
    User.findOrCreate({googleId:profile.id}, function(err,user){
        return cb(err,user);
    });
    }
))