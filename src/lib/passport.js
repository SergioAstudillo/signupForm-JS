const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    'local.signup',
    new LocalStrategy(
        {
            email: 'emailInput',
            password: 'passwordInput',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            console.log(req.body);
        }
    )
);

// passport.serializeUser((email, done) => {

// });
