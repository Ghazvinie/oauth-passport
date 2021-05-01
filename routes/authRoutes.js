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
router.get('/googleAuth', (request, response) => {
    // hanlde with passport
    response.send('Authorising with authorisation server');
});

module.exports = router;