/* Importing express and initialize */
const express = require('express');
const app = express();
//Import path.
const path = require('path');
/* Import router, defined in router.js */
const router = require('./routes/routes.js');
/* Import another router, defined in authentication.js */
const authentication = require('./routes/authentication');
//Import express-handlebars to define our view engine.
const handlebars = require('express-handlebars');
//Import Morgan.
const morgan = require('morgan');
//Import Flash.
const flash = require('connect-flash');
/* Import express-session and passport */
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session');
//Import the database from keys.js
const { database } = require('./keys.js');
//TODO: check if this line is necessary.
require('./lib/passport');
//Import .env
require('dotenv').config();

/* Server initial settings */
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine(
	'.hbs',
	handlebars({
		defaultLayout: 'default',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs',
		//helpers: require('.lib/handlebars'),
	}),
);
app.set('view engine', '.hbs');

/* Middlewares */
/* Creation of the session. */
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MySQLStore(database),
	}),
);
//Initialize flash to create the 3 flash messages options
app.use(flash());
app.use(morgan('dev'));
//Accept the data from the user in the form.
app.use(express.urlencoded({ extended: false }));
//Allows to use JSON in the app to communicate between the client and the server.
app.use(express.json());
/* Initialize passport and passport.session */
app.use(passport.initialize());
app.use(passport.session());

/* Global variables */
//Creation of the 3 possible flash messages.
app.use((req, res, next) => {
	app.locals.success = req.flash('success');
	app.locals.successSignup = req.flash('successSignup');
	app.locals.incorrectPassword = req.flash('incorrectPassword');
	app.locals.unknownEmail = req.flash('unknownEmail');
	app.locals.alreadyLoggedIn = req.flash('alreadyLoggedIn');
	app.locals.notLoggedIn = req.flash('notLoggedIn');
	app.locals.user = req.user;
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
