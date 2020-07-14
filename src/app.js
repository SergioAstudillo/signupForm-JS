/* Importing the npm modules */
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes.js');
const morgan = require('morgan');

/* Server initial settings */
app.set('port', process.env.PORT || 8080);
app.set('views', 'src/views');
app.set('view engine', 'pug');

/* Middlewares */
app.use(morgan('dev'));

/* Global variables */

/* Routes */
app.use(router);

/* Static files */
app.use('/assets', express.static('src/assets'));
app.use('/public', express.static('src/public'));

/* Server listening */
app.listen(app.get('port'), () => {
    console.log(`Server started on port: ${app.get('port')}`);
});
