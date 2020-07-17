/* Use of the .env file and the variables inside it. */
require('dotenv').config();
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DatabaseNAME = process.env.DatabaseNAME;

/* Export a database object with all the variables defined in the .env file. */
module.exports = {
    database: {
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: DatabaseNAME,
    },
};
