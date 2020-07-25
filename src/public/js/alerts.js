//Import sweetalert2.
const Swal = require('sweetalert2');
const { options } = require('../../routes/routes');

//Unknown email message.
function unknownEmail(email) {
	Swal.fire({
		icon: 'error',
		title: 'Unknown email.',
		text: `${email} doesn't exist in our DB.`,
	});
}

//Incorrect password message.
function incorrectPassword(email) {
	Swal.fire({
		icon: 'error',
		title: 'Incorrect password.',
		text: `${email} has a different password. Try again.`,
	});
}

//Successful login message.
function success(fullname) {
	Swal.fire({
		icon: 'success',
		title: 'Greetings',
		text: `Welcome back ${fullname}`,
	});
}

module.exports = {
	unknownEmail,
	incorrectPassword,
	success,
};
