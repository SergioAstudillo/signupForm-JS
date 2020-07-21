const express = require('express');
const router = express.Router();

//Import the connection created in database.js
const dbCONNECTION = require('../database');
const pool = require('../database');

//
router.post('/signup', async (req, res) => {
    const { emailInput, passwordInput } = req.body;

    const email = emailInput;
    const fullname = email;
    const password = passwordInput;

    const newUser = {
        email,
        fullname,
        password,
    };

    console.log(newUser);
    try {
        await pool.query('INSERT INTO users set ?', [newUser]);
    } catch (err) {
        console.log(err);
    }
    console.log('Data received');
});

//Export router module.
module.exports = router;
