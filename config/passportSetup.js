const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

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
            console.log(`User already exists`);
            done(null, userFound);
        } else {
            new User({
                username: profile.displayName,
                googleID: profile.id,
                thumbnail: profile._json.picture
            }).save()
                .then((newUser) => {
                    console.log(`New user`);
                    done(null, newUser);
                });

        }
    });
})
);