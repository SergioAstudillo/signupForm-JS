const express = require('express');
const router = express.Router();
/* Test */
const pug = require('pug');

//Import the connection created in database.js
const pool = require('../database');

/* Receive the form in POST and insert the data in the DB. */
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
    try {
        await pool.query('INSERT INTO users set ?', [newUser]);
        console.log('Data received and stored in the DB.');
    } catch (err) {
        console.log(err);
        console.log('There has been an error inserting the data in the DB.');
    }
});

/* Retrieve the data from the DB when the user is logged in. */
router.get('/profile', async (req, res) => {
    try {
        //TODO: make this request only select the account that the user introduced in the login page.
        const users = await pool.query(`SELECT * FROM users;`);
        res.render('profile', {
            email: users[0].email,
            fullname: users[0].fullname,
            password: users[0].password,
            created_at: users[0].created_at,
        });
    } catch (err) {
        console.log(`There has been an error trying to select the user from the database.\nOR \nThere has been an error trying to render /profile page.\nThis is the error code: \n${err}`);
    }
});

//Export router module.
module.exports = router;
