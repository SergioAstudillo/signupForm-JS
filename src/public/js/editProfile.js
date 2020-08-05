/* Regex separation for dynamic validation. */
const totalLength = /.{8,30}/g;
const minimumNumbers = /[0-9]/g;
const minimunLowerANDUpperCaseCharacters = /(?=.*[a-z])(?=.*[A-Z])/g;
const minimumSymbols = /(?=.*?[#?!@$€%&*\-+.,])/g;
//Pattern creation. Minimum 8 characters, 1 UpperCase, 1 lowercase, 1 number and 1 of the indicated symbols.
const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{1,}?[0-9])(?=.*?[#?!@$€%&*\-+.,]).{8,30}$/g;

// Button for sending the data.
const submitButton = document.querySelector('.form__submitButton--middle');

/* Selectors for both password inputs */
const dynamicValidation = document.querySelector('#inputCurrentPassword');
const dynamicValidationNewPassword = document.querySelector('#inputNewPassword');

/* Original regex separated. */
/* Function for checking the final passwords in both password inputs. */
function checkPassword() {
	//Store the password in a private const and remove the possible whitespaces.
	const superSecretPassword = document.querySelector('#inputCurrentPassword').value.replace(/\s/g, '');
	const superSecretNewPassword = document.querySelector('#inputNewPassword').value.replace(/\s/g, '');
	if (validateBothPasswords(superSecretPassword, superSecretNewPassword, fullPasswordPattern)) {
		return true;
	} else {
		return false;
	}
}

function validateBothPasswords(superSecretPassword, superSecretNewPassword, fullPasswordPattern) {
	/* If the user passwords matchs the regex it returns true. */
	if (superSecretPassword.match(fullPasswordPattern) && superSecretNewPassword.match(fullPasswordPattern)) {
		return true;
	} else {
		console.clear();
		console.error(`One (or both) password(s) doesn't meet all the validations needed to modify the password(s).`);
		return false;
	}
}

/* Password dynamic validation. Explanation of each functionality inside: */
function validatePassword() {
	const firstValidationButton = document.querySelector('.form__validation--first');
	const secondValidationButton = document.querySelector('.form__validation--second');
	const thirdValidationButton = document.querySelector('.form__validation--third');
	const fourthValidationButton = document.querySelector('.form__validation--fourth');

	/* Highlight (OR unhighlight) the FIRST button if the password has 8 characters (OR less than 8 characters). */
	if (dynamicValidationNewPassword.value.replace(/\s/g, '').match(totalLength)) {
		firstValidationButton.classList.add('form__validation--greenCircle--first');
	} else if (!dynamicValidationNewPassword.value.replace(/\s/g, '').match(totalLength)) {
		firstValidationButton.classList.remove('form__validation--greenCircle--first');
	}

	/* Highlight (OR unhighlight) the SECOND button if the password has 1 number (OR less than 1 number). */
	if (dynamicValidationNewPassword.value.replace(/\s/g, '').match(minimumNumbers)) {
		secondValidationButton.classList.add('form__validation--greenCircle--second');
	} else if (!dynamicValidationNewPassword.value.replace(/\s/g, '').match(minimumNumbers)) {
		secondValidationButton.classList.remove('form__validation--greenCircle--second');
	}

	/* Highlight (OR unhighlight) the THIRD button if the password has 1 uppercase and 1 lowercase character (OR less than 1 uppercase and 1 lowercase character). */
	if (dynamicValidationNewPassword.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
		thirdValidationButton.classList.add('form__validation--greenCircle--third');
	} else if (!dynamicValidationNewPassword.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
		thirdValidationButton.classList.remove('form__validation--greenCircle--third');
	}

	/* Highlight (OR unhighlight) the FOURTH button if the password has 1 symbol (OR less than 1 symbol). */
	if (dynamicValidationNewPassword.value.replace(/\s/g, '').match(minimumSymbols)) {
		fourthValidationButton.classList.add('form__validation--greenCircle--fourth');
	} else if (!dynamicValidationNewPassword.value.replace(/\s/g, '').match(minimumSymbols)) {
		fourthValidationButton.classList.remove('form__validation--greenCircle--fourth');
	}
	const fifthValidationButton = document.querySelector('.form__validation--fifth');
	deleteWhitespacesPasswords();

	/* Highlight (OR unhighlight) the FIFTH button if the password is valid in both inputs (OR not). */
	if (dynamicValidation.value.replace(/\s/g, '').match(fullPasswordPattern) && dynamicValidationNewPassword.value.replace(/\s/g, '').match(fullPasswordPattern)) {
		fifthValidationButton.classList.add('form__validation--greenCircle--fifth');
	} else {
		fifthValidationButton.classList.remove('form__validation--greenCircle--fifth');
	}
}

/* If the user types a whitespace in the password fields it automatically removes it. */
function deleteWhitespacesPasswords() {
	dynamicValidationNewPassword.value = dynamicValidationNewPassword.value.replace(/\s/g, '');
	dynamicValidation.value = dynamicValidation.value.replace(/\s/g, '');
}

/* Event listener for dynamic password typing validation. */
dynamicValidationNewPassword.addEventListener('keydown', validatePassword);
dynamicValidationNewPassword.addEventListener('keyup', validatePassword);
dynamicValidation.addEventListener('keydown', validatePassword);
dynamicValidation.addEventListener('keyup', validatePassword);

/* Fullname validation. */
function checkFullname() {
	const fullnamePattern = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i;

	const userFullname = document.querySelector('#inputFullname');
	const correctedFullname = capitalizeInitials(userFullname.value.toLowerCase());
	/* Capitalize the initials of each word. */
	function capitalizeInitials(str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	/* If the fullname input match the regex it returns true. */
	if (correctedFullname.match(fullnamePattern)) {
		console.log(`The fullname you introduced is valid.`);
		userFullname.value = correctedFullname;
		return true;
	} else {
		userFullname.focus();
		console.error(`The fullname you introduced is invalid.`);
		return false;
	}
}

/* Function called every time the user press the 'CHANGE PROFILE INFORMATION' button. */
function submitData() {
	if (checkFullname() || checkPassword()) {
		if (!checkFullname()) {
			if (document.querySelector('#inputFullname').value === '') {
				document.mainForm.fullnameInput.value = '1';
			}
		}
		if (!checkPassword()) {
			if (dynamicValidation.value === '' && dynamicValidationNewPassword.value === '') {
				document.mainForm.currentPasswordInput.value = '1';
				document.mainForm.newPasswordInput.value = '1';
			}
		}
		submitButton.setAttribute('type', 'submit');
	} else {
		submitButton.setAttribute('type', 'button');
	}
}

/* Interactive buttons. */
/* Displays and hides the clear button depending on the focus */
const inputFullname = document.querySelector('#inputFullname');

inputFullname.addEventListener('focus', () => {
	document.querySelector('#clear').style.display = 'block';
});

inputFullname.addEventListener('focusout', () => {
	setTimeout(() => {
		document.querySelector('#clear').style.display = 'none';
	}, 500);
});

/* Clear the fullname input when you press the button. */
function clearButton() {
	inputFullname.value = '';
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

/* Dynamic display of fullname and password inputs when the user press the left button. */
let defaultStateData = true;

function showData() {
	const formFullnameContainer = document.querySelector('.form__input--fullnameContainer');
	const formPasswordContainer = document.querySelector('.form__input--passwordContainer');
	const formValidationContainer = document.querySelector('.form__validation--wrapper');
	const hideORShowButton = document.querySelector('.form__submitButton--left');
	const sendDataButton = document.querySelector('.form__submitButton--middle');

	/* If the data is ACTUALLY HIDDEN it executes this piece of code. */
	if (defaultStateData) {
		formFullnameContainer.style.display = 'block';
		formPasswordContainer.style.display = 'block';
		formValidationContainer.style.display = 'flex';
		sendDataButton.style.display = 'flex';
		inputFullname.focus();
		defaultStateData = false;
		hideORShowButton.innerHTML = 'Hide inputs';
		/* If the data is BEING DISPLAYED it executes this piece of code. */
	} else {
		formFullnameContainer.style.display = 'none';
		formPasswordContainer.style.display = 'none';
		formValidationContainer.style.display = 'none';
		sendDataButton.style.display = 'none';
		hideORShowButton.blur();
		defaultStateData = true;
		hideORShowButton.innerHTML = 'Show inputs';
	}
}
