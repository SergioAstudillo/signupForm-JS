//Import MySQL npm package.
const mysql = require('mysql');
require('dotenv').config();

//Import promisify package.
const { promisify } = require('util');

//Import database object from keys.js with all the attributes needed to create a connection with the DB.
const { database } = require('./keys');

//Create our connection with the DB using the object previously imported.
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    /* Treat the different error codes. */
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED. THIS MIGHT HAPPEN DUE TO INCORRECT LOGIN INFORMATION');
        }
    }

    /* Release the connection to the database when connected. */
    if (connection) connection.release();
    console.log('DB is connected;');
    return;
});

//Change callbacks to promises with promisify.
pool.query = promisify(pool.query);

//Export the pool (connection to the DB).
module.exports = pool;
