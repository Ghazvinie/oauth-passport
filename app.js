const express = require('express');
const authRouter = require('./routes/authRoutes');
const passportSetup = require('./config/passportSetup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Connect to mongoDB 
mongoose.connect(keys.mongodb.MongoURI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log(error));

// Use authrouter
app.use('/auth', authRouter);

// Create home route
app.get('/', (request, response) => {
    response.render('home');
});

app.listen(8080, () => {
    console.log('Server is listening...');
});

