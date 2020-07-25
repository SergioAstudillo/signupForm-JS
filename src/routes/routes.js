const express = require('express');
const router = express.Router();

/* Routes */
router.get('/', (req, res) => {
	res.render('index', { title: 'Landing Page', css: 'public/css/initialPage.css' });
});

router.get('/signup', (req, res) => {
	res.render('signup', { title: 'Sign-up Form', css: 'public/css/style.css' });
});

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login Form', css: 'public/css/style.css' });
});

// router.get('/profile', (req, res) => {
// 	res.render('profile');
// });

//Export router module.
module.exports = router;
