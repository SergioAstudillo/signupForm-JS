const totalLength = /.{8,30}/g;
const minimumNumbers = /(.{0}?[0-9])/g;
const minimumUpperCaseCharacters = /(.*?[A-Z])/g;
const minimumLowerCaseCharacters = /(.*?[a-z])/g;
const minimumSymbols = /(?=.*?[#?!@$€%&*\-+.,])/g;

/* Original regex separated. */
function checkPassword() {
    //Pattern creation. Minimum 8 characters, 1 UpperCase, 1 lowercase, 1 number and 1 of the indicated symbols.
    const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{1,}?[0-9])(?=.*?[#?!@$€%&*\-+.,]).{8,30}$/g;

    //Pattern separation for dynamic validation.

    //Store the password in a private const and remove the whitespaces.
    const superSecretPassword = document.querySelector('#inputPassword').value.replace(/\s/g, '');

    if (superSecretPassword.match(fullPasswordPattern)) {
        console.log('Valid password');
        document.getElementById('inputPassword').value = '';
    } else {
        console.log('Invalid password');
        document.getElementById('inputPassword').focus();
    }
}

//TODO: See if I can keep the following variables private.
let dynamicValidation = document.querySelector('#inputPassword');
let dynamicValidationValue = document.querySelector('#inputPassword').value.replace(/\s/g, '');
let firstValidationButton = document.querySelector('.form__validation--first');

dynamicValidation.addEventListener('keydown', () => {
    /* Highlight the FIRST button if the password has 8 characters. */
    if (dynamicValidation.value.replace(/\s/g, '').match(totalLength)) {
        firstValidationButton.classList.add('form__validation--greenCircle--first');
    }
    /* Unhighlight the FIRST button if the password has less than 8 characters. */
    if (!dynamicValidation.value.replace(/\s/g, '').match(totalLength)) {
        firstValidationButton.classList.remove('form__validation--greenCircle--first');
    }
});
