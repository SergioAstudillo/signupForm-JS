/* Importing the npm modules */
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes.js');
const authentication = require('./routes/authentication');
const morgan = require('morgan');
require('dotenv').config();

/* Server initial settings */
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middlewares */
app.use(morgan('dev'));
//Accept the data from the user in the form.
app.use(express.urlencoded({ extended: false }));
//Allows to use JSON in the app to communicate between the client and the server.
app.use(express.json());

/* Global variables */
//Get the request from the user, the response and the next function to execute.
app.use((req, res, next) => {
    next();
});

/* Routes */
app.use(router);
app.use(authentication);

/* Static files */
app.use('/assets', express.static('src/assets'));
app.use('/public', express.static('src/public'));

/* Server listening */
app.listen(app.get('port'), () => {
    console.log(`Server started on port: ${app.get('port')}`);
});
