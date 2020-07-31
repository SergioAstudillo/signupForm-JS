/* Dynamic password validation from lines 2 to 79 */
/* Fullname validation from lines 80 to 92 */

//Pattern separation for dynamic validation.
const totalLength = /.{8,30}/g;
const minimumNumbers = /[0-9]/g;
const minimunLowerANDUpperCaseCharacters = /(?=.*[a-z])(?=.*[A-Z])/g;
const minimumSymbols = /(?=.*?[#?!@$€%&*\-+.,])/g;

/* Global variables */
const submitFullname = document.querySelector('.form__submitButton--left');
const submitPassword = document.querySelector('.form__submitButton--middle');

/* Original regex separated. */
function checkPassword() {
	//Pattern creation. Minimum 8 characters, 1 UpperCase, 1 lowercase, 1 number and 1 of the indicated symbols.
	const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{1,}?[0-9])(?=.*?[#?!@$€%&*\-+.,]).{8,30}$/g;

	//Store the password in a private const and remove the whitespaces.
	const superSecretPassword = document.querySelector('#inputCurrentPassword').value.replace(/\s/g, '');

	if (superSecretPassword.match(fullPasswordPattern)) {
		console.log('Valid password');
		return true;
	} else {
		console.error('Invalid password');
		clearInput();
		document.getElementById('inputCurrentPassword').value = '';
		document.getElementById('inputCurrentPassword').focus();
		return false;
	}
}

function clearInput() {
	const firstValidation = document.querySelector('.form__validation--first');
	const secondValidation = document.querySelector('.form__validation--second');
	const thirdValidation = document.querySelector('.form__validation--third');
	const fourthValidation = document.querySelector('.form__validation--fourth');
	const fifthValidation = document.querySelector('.form__validation--fifth');

	firstValidation.classList.remove('form__validation--greenCircle--first');
	secondValidation.classList.remove('form__validation--greenCircle--second');
	thirdValidation.classList.remove('form__validation--greenCircle--third');
	fourthValidation.classList.remove('form__validation--greenCircle--fourth');
	fifthValidation.classList.remove('form__validation--greenCircle--fifth');
}

const dynamicValidation = document.querySelector('#inputCurrentPassword');
const dynamicValidationNewPassword = document.querySelector('#inputNewPassword');

function validatePassword() {
	const firstValidationButton = document.querySelector('.form__validation--first');
	const secondValidationButton = document.querySelector('.form__validation--second');
	const thirdValidationButton = document.querySelector('.form__validation--third');
	const fourthValidationButton = document.querySelector('.form__validation--fourth');

	/* Highlight (OR unhighlight) the FIRST button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidation.value.replace(/\s/g, '').match(totalLength)) {
		firstValidationButton.classList.add('form__validation--greenCircle--first');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(totalLength)) {
		firstValidationButton.classList.remove('form__validation--greenCircle--first');
	}

	/* Highlight (OR unhighlight) the SECOND button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidation.value.replace(/\s/g, '').match(minimumNumbers)) {
		secondValidationButton.classList.add('form__validation--greenCircle--second');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(minimumNumbers)) {
		secondValidationButton.classList.remove('form__validation--greenCircle--second');
	}

	/* Highlight (OR unhighlight) the THIRD button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidation.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
		thirdValidationButton.classList.add('form__validation--greenCircle--third');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
		thirdValidationButton.classList.remove('form__validation--greenCircle--third');
	}

	/* Highlight (OR unhighlight) the FOURTH button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidation.value.replace(/\s/g, '').match(minimumSymbols)) {
		fourthValidationButton.classList.add('form__validation--greenCircle--fourth');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(minimumSymbols)) {
		fourthValidationButton.classList.remove('form__validation--greenCircle--fourth');
	}
}

function comparePasswords() {
	const fifthValidationButton = document.querySelector('.form__validation--fifth');

	/* Highlight (OR unhighlight) the FIFTH button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidationNewPassword.value.replace(/\s/g, '').match(dynamicValidation.value.replace(/\s/g, ''))) {
		fifthValidationButton.classList.add('form__validation--greenCircle--fifth');
	} else if (!dynamicValidation.value.replace(/\s/g, '').match(dynamicValidation.value.replace(/\s/g, ''))) {
		fifthValidationButton.classList.remove('form__validation--greenCircle--fifth');
	}
}

//Event listener for dynamic typing.
dynamicValidation.addEventListener('keydown', validatePassword);
dynamicValidation.addEventListener('keyup', validatePassword);

//Event listener for checking if the 2 passwords are the exact same.
dynamicValidationNewPassword.addEventListener('keydown', comparePasswords);
dynamicValidationNewPassword.addEventListener('keyup', comparePasswords);

/* Email validation. */
function checkFullname() {
	const fullnamePattern = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i;

	const userFullname = document.querySelector('#inputFullname');
	const correctedFullname = userEmail.value.toLowerCase();
	// const fullnameValidationIncorrect = document.querySelector('#emailValidationIncorrect');

	if (correctedFullname.match(fullnamePattern)) {
		console.log(`The fullname you introduced is valid: ${userFullname.value.toLowerCase()}`);
		userFullname.value = correctedFullname;
		submitFullname.setAttribute('background', '#2ecc71');
		return true;
	} else {
		userFullname.value = '';
		userFullname.focus();
		console.err(`The fullname you introduced is invalid: ${userFullname.value.toLowerCase()}`);
	}
}

function submitData() {
	if (checkPassword() && checkFullname()) {
		submitFullname.setAttribute('type', 'submit');
		submitPassword.setAttribute('type', 'submit');
	} else if (checkFullname()) {
		submitFullname.setAttribute('type', 'submit');
		submitPassword.setAttribute('type', 'button');
	} else if (checkPassword()) {
		submitPassword.setAttribute('type', 'submit');
		submitFullname.setAttribute('type', 'button');
	} else {
		submitFullname.setAttribute('type', 'button');
		submitPassword.setAttribute('type', 'button');
	}
}

/* Interactive buttons. */
/* Displays and hides the clear button depending on the focus */
const input = document.querySelector('#inputFullname');

input.addEventListener('focus', () => {
	document.querySelector('#clear').style.display = 'block';
});

input.addEventListener('focusout', () => {
	setTimeout(() => {
		document.querySelector('#clear').style.display = 'none';
	}, 500);
});

//Clear the email input when you press the button.
function clearButton() {
	input.value = '';
}

/* Password dynamic hide/show button. */
var defaultState = true;

function eyeButton() {
	if (defaultState) {
		document.getElementById('inputCurrentPassword').setAttribute('type', 'text');
		document.getElementById('inputNewPassword').setAttribute('type', 'text');
		defaultState = false;
		document.querySelector('#eye-show').style.display = 'none';
		document.querySelector('#eye-hide').style.display = 'block';
	} else {
		document.getElementById('inputCurrentPassword').setAttribute('type', 'password');
		document.getElementById('inputNewPassword').setAttribute('type', 'password');
		defaultState = true;
		document.querySelector('#eye-hide').style.display = 'none';
		document.querySelector('#eye-show').style.display = 'block';
	}
}
