/* Import modules and DB query. */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');
const time = require('./timeago');
/* REGEX for validations. */
const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{1,}?[0-9])(?=.*?[#?!@$€%&*\-+.,]).{8,30}$/g;
const fullnamePattern = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i;
const fullEmailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/* Login validation. */
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
				const user = entry[0];
				/* Creation of some constant values and exporting them to show in the /profile. */
				const userFullname = user.fullname;
				const userEmail = user.email;
				const timeSinceCreation = time.timeago(user.created_at);
				const account = {
					email: userEmail,
					fullname: userFullname,
					creationDate: timeSinceCreation,
				};
				module.exports = account;
				//Compare the password with the one on the DB.
				const validPassword = await helpers.comparePassword(password, user.password);
				//Treating the data and displaying some codes depending of the outcome.
				validPassword ? done(null, user, req.flash('success', userFullname)) : done(null, false, req.flash('incorrectPassword', email));
			} else {
				return done(null, false, req.flash('unknownEmail', email));
			}
		},
	),
);

/* Signup with password encryption. */
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
				if (newUser.email.length > 0) {
					/* Checks if introduced email is available */
					const emailChecker = await pool.query('SELECT email FROM users WHERE email= ?', [newUser.email]);
					if (emailChecker.length > 0) {
						/* In case of error, return a done function with nothing, except a flash to tell the user that the email is already used in the DB.
						It DOESN'T store anything in the DB */
						return done(null, false, req.flash('usedEmail', 'The email you introduced is already stored in our DB. Please, use a NEW email.'));
					}
					if (password.match(fullPasswordPattern) && email.match(fullEmailPattern)) {
						const result = await pool.query('INSERT INTO users set ?', [newUser]);
						newUser.id = result.insertId;
						return done(null, newUser, req.flash('successSignup', newUser.email));
					} else {
						throw new Error(`The password isn't valid.`);
					}
				}
			} catch (err) {
				console.error(err);
				console.error('There has been an error inserting the data in the DB.');
			}
		},
	),
);

/* Edit profile with password encryption. */
passport.use(
	'local.profileEdit',
	new LocalStrategy(
		{
			usernameField: 'fullnameInput',
			passwordField: 'newPasswordInput',
			passReqToCallback: true,
		},
		async (req, fullname, newPassword, done) => {
			/* Make constants to use later in the function. */
			const currentPassword = req.body.currentPasswordInput;
			const userID = req.user.id;
			// SELECT the user that is currently logged in.
			const entry = await pool.query('SELECT * FROM users WHERE id = ?', [userID]);
			/* If the query found the user (it should do) it will execute this if: */
			if (entry.length > 0) {
				// We store the first entry retrieved from the DB to use it as "user".
				const user = entry[0];
				/* If the user introduced some valid data in the fullname OR password/s field/s it will execute this if: */
				if ((fullname.length > 0 && fullname.match(fullnamePattern)) || (newPassword.length > 0 && currentPassword.length > 0 && newPassword.match(fullPasswordPattern) && currentPassword.match(fullPasswordPattern))) {
					/* Creation of global variables to detect if the fullname and password has been saved. */
					var fullnameOK = true;
					var passwordOK = true;
					/* If the user introduced a fullname and it matches the fullname REGEX: */
					if (fullname.length > 0 && fullname.match(fullnamePattern)) {
						try {
							//Update the fullname in the DB
							const updateFullnameQuery = await pool.query(`UPDATE users SET fullname='${fullname}' WHERE id='${userID}'`);
							//Update the fullname of the logged user.
							req.user.fullname = fullname;
							//Maintain the var with a true value, to let the program know the fullname has been updated.
							fullnameOK = true;
						} catch (err) {
							//Set the var to false to let the program know
							fullnameOK = false;
							/* Display the error to the user */
							console.error(err);
							console.error('There has been an error updating your fullname in the DB. Please, try it again.');
						}
					} else if (!(fullname.length > 0 && fullname.match(fullnamePattern))) {
						/* In case the user doesn't introduce nothing in the fullname field (or the data introduced is not valid) it will let him and the program know the fullname hasn't been updated. */
						fullnameOK = false;
						console.log(`The fullname doesn't contain anything or the data inside the input has invalid characters.`);
					}
					/* If the user introduced both passwords and both match the REGEX: */
					if (newPassword.length > 0 && newPassword.match(fullPasswordPattern) && currentPassword.length > 0 && currentPassword.match(fullPasswordPattern)) {
						try {
							//Compare the password introduced by the user to the one in the DB.
							const passwordComparison = await helpers.comparePassword(currentPassword, user.password);
							/* If the comparison returns a true value: */
							if (passwordComparison) {
								/* Encrypt the new password, introduce it in the DB and set the var to true to let the program know the password has been updated. */
								const newHashedPassword = await helpers.encryptPassword(newPassword);
								const updatePasswordQuery = await pool.query(`UPDATE users SET password='${newHashedPassword}' WHERE id='${userID}'`);
								req.user.password = newHashedPassword;
								passwordOK = true;
							} else {
								//If the password comparison returns a false value it will throw a Error so we can't update the password.
								throw new Error('The "current password" you introduced is not the same as the one stored in the DB.');
							}
						} catch (err) {
							/* In case there is an error during the comparison/encryption or update of the password it will show a general error. */
							passwordOK = false;
							console.error(err);
							console.error('There has been an error updating your password in the DB. Please, try it again.');
						}
					} else if (!(newPassword.length > 0 && newPassword.match(fullPasswordPattern) && currentPassword.length > 0 && currentPassword.match(fullPasswordPattern))) {
						/* In case the user doesn't introduce nothing in the passwords fields (or the data introduced is not valid) it will let him and the program know the password hasn't been updated. */
						passwordOK = false;
						console.log(`The password doesn't contain anything or the data inside the input has invalid characters.`);
					}
				}
				if (fullnameOK && passwordOK) {
					return done(null, req.user, req.flash('bothUpdated', 'Both fullname and password has been updated.'));
				} else if (fullnameOK) {
					return done(null, req.user, req.flash('onlyFullnameUpdated', 'Only your fullname has been updated.'));
				} else if (passwordOK) {
					return done(null, req.user, req.flash('onlyPasswordUpdated', 'Only your password has been updated.'));
				} else {
					return done(null, false, req.flash('nothingUpdated', 'We could not update anything in the DB. Check both inputs.'));
				}
			} else {
				return done(null, false, req.flash('moreThanOneUser', 'There are more than 2 users with that ID. That is not supposed to happen. Please contact any administrator so he can delete one of the accounts.'));
			}
		},
	),
);

/* Serializing the user to maintain the session. */
passport.serializeUser((user, done) => {
	done(null, user.id);
});

/* Deserializing the user to leave/release the session. */
passport.deserializeUser(async (id, done) => {
	const rows = await pool.query('SELECT * FROM users WHERE id= ?', [id]);
	done(null, rows[0]);
});
