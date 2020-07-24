const bcrypt = require('bcryptjs');

const helpers = {};

/* Store the hashed password in the object. */
helpers.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

helpers.comparePassword = async (unhashedPassword, hashedPassword) => {
	try {
		return await bcrypt.compare(unhashedPassword, hashedPassword);
	} catch (err) {
		console.error(err);
		console.error('Error comparing your password with the DB.');
	}
};

module.exports = helpers;
