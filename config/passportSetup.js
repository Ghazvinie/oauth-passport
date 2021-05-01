const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    //options for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/googleAuth/redirect'
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({
        googleID: profile.id
    }).then((userFound) => {
        if (userFound) {
            console.log(`User already exists - ${userFound}`);
        } else {
            new User({
                username: profile.displayName,
                googleID: profile.id
            }).save()
                .then((newUser) => {
                    console.log(`New user ${newUser}`);
                });

        }
    });
})
);