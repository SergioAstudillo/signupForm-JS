//Password dinamic validation.
/*let totalLength = /.{8,30}/;
let minimumNumbers = /(?=.{3,}?[0-9])/;
let minimumUpperCaseCharacters = /(?=.*?[A-Z])/;
let minimumLowerCaseCharacters = /(?=.*?[a-z])/;
let minimumSymbols = /(?=.*?[#?!@$%^&*-])/;

let superSecretPassword = [];*/
function checkPassword() {
    const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{3,}?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

    /*const totalLength = /.{8,30}/;
    const minimumNumbers = /(?=.{3,}?[0-9])/;
    const minimumUpperCaseCharacters = /(?=.*?[A-Z])/;
    const minimumLowerCaseCharacters = /(?=.*?[a-z])/;
    const minimumSymbols = /(?=.*?[#?!@$%^&*-])/;*/

    const superSecretPassword = document.querySelector('#inputPassword').value.replace(/\s/g, '');
    if (superSecretPassword.match(fullPasswordPattern)) {
        alert('Valid password');
        document.getElementById('inputPassword').value = '';
    } else {
        alert('Invalid password');
    }
}
