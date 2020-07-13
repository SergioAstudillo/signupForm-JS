//Pattern separation for dynamic validation.
const totalLength = /.{8,30}/g;
const minimumNumbers = /[0-9]/g;
const minimunLowerANDUpperCaseCharacters = /(?=.*[a-z])(?=.*[A-Z])/g;
const minimumSymbols = /(?=.*?[#?!@$€%&*\-+.,])/g;

/* Original regex separated. */
function checkPassword() {
    //Pattern creation. Minimum 8 characters, 1 UpperCase, 1 lowercase, 1 number and 1 of the indicated symbols.
    const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{1,}?[0-9])(?=.*?[#?!@$€%&*\-+.,]).{8,30}$/g;

    //Store the password in a private const and remove the whitespaces.
    const superSecretPassword = document.querySelector('#inputPassword').value.replace(/\s/g, '');

    if (superSecretPassword.match(fullPasswordPattern)) {
        console.log('Valid password');
        clearInput();
    } else {
        console.log('Invalid password');
        document.getElementById('inputPassword').focus();
        clearInput();
    }
}

function clearInput() {
    document.getElementById('inputPassword').value = '';

    const firstValidation = document.querySelector('.form__validation--first');
    const secondValidation = document.querySelector('.form__validation--second');
    const thirdValidation = document.querySelector('.form__validation--third');
    const fourthValidation = document.querySelector('.form__validation--fourth');

    firstValidation.classList.remove('form__validation--greenCircle--first');
    secondValidation.classList.remove('form__validation--greenCircle--first');
    thirdValidation.classList.remove('form__validation--greenCircle--first');
    fourthValidation.classList.remove('form__validation--greenCircle--first');
}

const dynamicValidation = document.querySelector('#inputPassword');

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

    /* Highlight (OR unhighlight) the FIRST button if the password has 8 characters (OR less than 8 characters). */
    if (dynamicValidation.value.replace(/\s/g, '').match(minimumNumbers)) {
        secondValidationButton.classList.add('form__validation--greenCircle--second');
    } else if (!dynamicValidation.value.replace(/\s/g, '').match(minimumNumbers)) {
        secondValidationButton.classList.remove('form__validation--greenCircle--second');
    }

    /* Highlight (OR unhighlight) the FIRST button if the password has 8 characters (OR less than 8 characters). */
    if (dynamicValidation.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
        thirdValidationButton.classList.add('form__validation--greenCircle--third');
    } else if (!dynamicValidation.value.replace(/\s/g, '').match(minimunLowerANDUpperCaseCharacters)) {
        thirdValidationButton.classList.remove('form__validation--greenCircle--third');
    }

    /* Highlight (OR unhighlight) the FIRST button if the password has 8 characters (OR less than 8 characters). */
    if (dynamicValidation.value.replace(/\s/g, '').match(minimumSymbols)) {
        fourthValidationButton.classList.add('form__validation--greenCircle--fourth');
    } else if (!dynamicValidation.value.replace(/\s/g, '').match(minimumSymbols)) {
        fourthValidationButton.classList.remove('form__validation--greenCircle--fourth');
    }
}

//Event listener for dynamic typing.
dynamicValidation.addEventListener('keydown', validatePassword);
dynamicValidation.addEventListener('keyup', validatePassword);
