const passport = require('passport');
const router = require('express').Router();

//Auth login 
router.get('/login', (request, response) => {
    response.render('login', { user : request.user });
});

// Auth logout
router.get('/logout', (request, response) => {
    // handle with passport
    request.logout();
    response.redirect('/');
});


// Authorisation server
router.get('/googleAuth', passport.authenticate('google', {
    scope: ['profile']
}));

// Callback redirect route
router.get('/googleAuth/redirect', passport.authenticate('google'), (request, response) => {
    response.redirect('/profile',);
});

module.exports = router;