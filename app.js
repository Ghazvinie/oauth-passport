const express = require('express');
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const passportSetup = require('./config/passportSetup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongoDB 
mongoose.connect(keys.mongodb.MongoURI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log(error));

// Use authrouter
app.use('/auth', authRouter);

// Use profilerouter
app.use('/profile', profileRouter);

// Create home route
app.get('/', (request, response) => {
    response.render('home');
});

app.listen(8080, () => {
    console.log('Server is listening...');
});

