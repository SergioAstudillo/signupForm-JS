const express = require('express');
const router = express.Router();
const pug = require('pug');

//Import the connection created in database.js
const pool = require('../database');

//Import the timestamp created by timeago.js
const time = require('../lib/timeago');

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
        console.error(err);
        console.error('There has been an error inserting the data in the DB.');
    }
});

/* Retrieve the data from the DB when the user is logged in. */
router.get('/profile', async (req, res) => {
    try {
        //TODO: make this request only select the account that the user introduced in the login page.
        const users = await pool.query(`SELECT * FROM users;`);
        //Store the results in different CONST.
        const email = users[0].email;
        const fullname = users[0].fullname;
        const password = users[0].password;
        const created_at = time.timeago(users[0].created_at);
        res.render('profile', {
            email: email,
            fullname: fullname,
            password: password,
            created_at: created_at,
        });
    } catch (err) {
        console.error(`There has been an error trying to select the user from the database.\nOR \nThere has been an error trying to render /profile page.\nThis is the error code: \n${err}`);
    }
});

//Export router module.
module.exports = router;
