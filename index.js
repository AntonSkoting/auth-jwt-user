const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pages = require('./routes/pages');
dotenv.config(); // Skapar instans av dotenv.

// Connect to DB.
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to database!');
});

const authRoute = require('./routes/auth');
const secureRoute = require('./routes/secure');

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Route Middleware
app.use('/api/user', authRoute); // Detta är för att logga in och sign up för användare. 
app.use('/api/secure', secureRoute); // Använder säkring av sidan.
app.use('/', pages);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running!');
});
