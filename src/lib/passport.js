const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');
const alerts = require('./../public/js/alerts');

passport.use(
	'local.login',
	new LocalStrategy(
		{
			usernameField: 'emailInput',
			passwordField: 'passwordInput',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const entry = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
			if (entry.length > 0) {
				const userFullname = entry[0].fullname;
				const user = entry[0];
				const validPassword = await helpers.comparePassword(password, user.password);
				validPassword ? done(null, user, req.flash('success', alerts.success(email))) : done(null, false, req.flash('incorrectPassword', alerts.incorrectPassword(email)));
			} else {
				return done(null, false, req.flash('unknownEmail', alerts.unknownEmail(email) /*"Email doesn't exist."*/));
				//TODO: create the flashes using SweetAlert.
			}
		},
	),
);

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
				newUser.id = result.insertId;
				req.flash('success', 'Data received and stored in the DB.');
				return done(null, newUser);
			} catch (err) {
				console.error(err);
				console.error('There has been an error inserting the data in the DB 😓');
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await pool.query('SELECT * FROM users WHERE id= ?', [id]);
	done(null, rows[0]);
});
