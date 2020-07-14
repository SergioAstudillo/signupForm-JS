/* Importing the npm modules */
const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes.js');

//Server initial settings
app.set('port', 8080);
app.set('views', 'views');
app.set('view engine', 'pug');

/* Middlewares */

/* Routes */
app.use(router);

/* Static files */
app.use('/assets', express.static('assets'));
app.use('/public', express.static('public'));

/* Server listening */
app.listen(app.get('port'), () => {
    console.log(`Server started on port: ${app.get('port')}`);
});
