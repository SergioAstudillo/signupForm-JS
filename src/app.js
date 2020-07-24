/* Importing express and initialize */
const express = require('express');
const app = express();
//Import path.
const path = require('path');
/* Import router, defined in router.js */
const router = require('./routes/routes.js');
/* Import another router, defined in authentication.js */
const authentication = require('./routes/authentication');
//Import Morgan.
const morgan = require('morgan');
//Import pug.
const pug = require('pug');
//Import Flash.
const flash = require('connect-flash');
/* Import express-session and passport */
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys.js');

require('./lib/passport');
//Import .env
require('dotenv').config();

/* Server initial settings */
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Middlewares */
app.use(
	session({
		cookie: { maxAge: 60000 },
		secret: 'woot',
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(morgan('dev'));
//Accept the data from the user in the form.
app.use(express.urlencoded({ extended: false }));
//Allows to use JSON in the app to communicate between the client and the server.
app.use(express.json());
app.use(flash());
/* Initialize passport and passport.session */
app.use(passport.initialize());
app.use(passport.session());

/* Global variables */
//Get the request from the user, the response and the next function to execute.
app.use((req, res, next) => {
	app.locals.success = req.flash('success');
	app.locals.message = req.flash('message');
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
