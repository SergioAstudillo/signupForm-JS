//Password dinamic validation.
/*let totalLength = /.{8,30}/;
let minimumNumbers = /(?=.{3,}?[0-9])/;
let minimumUpperCaseCharacters = /(?=.*?[A-Z])/;
let minimumLowerCaseCharacters = /(?=.*?[a-z])/;
let minimumSymbols = /(?=.*?[#?!@$%^&*-])/;

let superSecretPassword = [];*/
function checkPassword() {
    const fullPasswordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.{3,}?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;

    const totalLength = /.{8,30}/;
    const minimumNumbers = /(?=.{2,}?[0-9])/;
    const minimumUpperCaseCharacters = /(?=.*?[A-Z])/;
    const minimumLowerCaseCharacters = /(?=.*?[a-z])/;
    const minimumSymbols = /(?=.*?[#?!@$%^&*-])/;

    const superSecretPassword = document.querySelector('#inputPassword').value.replace(/\s/g, '');
    if (superSecretPassword.match(fullPasswordPattern)) {
        console.log('Valid password');
        document.getElementById('inputPassword').value = '';
        //TODO: Make the web automatically select the password input when failed.
        document.getElementById('inputPassword').focus();
    } else {
        console.log('Invalid password');
    }
    /*TODO: IR VALIDANDO POCO A POCO, ES DECIR: MIRAR SI HAY 3 NÚMEROS EN EL TOTAL 
    DE POSICIONES Y SI LOS HAY (COMPROBAR CON MATCH) HACER QUE SE ILUMINE EL CIRCULITO
    AZUL.*/
}
