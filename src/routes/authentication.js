const express = require('express');
const router = express.Router();

//Import the connection created in database.js
const dbCONNECTION = require('../database');

//
router.post('/signup', (req, res) => {
    res.send('Received.');
});

//Export router module.
module.exports = router;
