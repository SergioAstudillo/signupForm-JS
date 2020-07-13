const express = require('express');
const router = express.Router();

/* Routes */
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

//Export router module.
module.exports = router;
