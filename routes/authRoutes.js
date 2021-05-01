const passport = require('passport');
const router = require('express').Router();

//Auth login 
router.get('/login', (request, response) => {
    response.render('login');
});

// Auth logout
router.get('/logout', (request, response) => {
    // handle with passport
    response.send('Logging out');
});


// Authorisation server
router.get('/googleAuth', passport.authenticate('google', {
    scope: ['profile']
}));

// Callback redirect route
router.get('/googleAuth/redirect', passport.authenticate('google'), (request, response) => {
    // response.send('You reached a callback uri');
});

module.exports = router;