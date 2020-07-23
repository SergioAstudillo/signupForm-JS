//Import the format function from timeago.js
const { format } = require('timeago.js');

//Create an object where we are gonna store the timestamp.
const time = {};

/* Store the attribute 'timeago' in the time object. The function returns the timestamp from the params in the correct format */
time.timeago = (timestamp) => {
    return format(timestamp);
};

//Export the object.
module.exports = time;
