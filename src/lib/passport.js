const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use(
	'local.signup',
	new LocalStrategy(
		{
			usernameField: 'emailInput',
			passwordField: 'passwordInput',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const fullname = email;
			const newUser = {
				email,
				fullname,
				password,
			};
			newUser.password = await helpers.encryptPassword(password);
			try {
				const result = await pool.query('INSERT INTO users set ?', [newUser]);
				console.log('Data received and stored in the DB.');
			} catch (err) {
				console.error(err);
				console.error('There has been an error inserting the data in the DB.');
			}
		},
	),
);

// passport.serializeUser((email, done) => {

// });
