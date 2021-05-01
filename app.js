const express = require('express');
const authRouter = require('./routes/authRoutes');

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Use authrouter
app.use('/auth', authRouter);

// Create home route
app.get('/', (request, response) => {
    response.render('home');
});

app.listen(8080, () => {
    console.log('Server is listening...');
});

