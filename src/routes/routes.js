const express = require('express');
const router = express.Router();
//Import 2 methods to check if the user is already logged in or not.
const { userLoggedIn, userNotLoggedIn } = require('./../lib/routesProtection');

/* Routes */
router.get('/', userNotLoggedIn, (req, res) => {
	res.render('index', { title: 'Landing Page', css: 'public/css/initialPage.css' });
});

router.get('/signup', userNotLoggedIn, (req, res) => {
	res.render('signup', { title: 'Sign-up Form', css: 'public/css/style.css' });
});

router.get('/login', userNotLoggedIn, (req, res) => {
	res.render('login', { title: 'Login Form', css: 'public/css/style.css' });
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

// router.get('/profile', (req, res) => {
// 	res.render('profile');
// });

//Export router module.
module.exports = router;
