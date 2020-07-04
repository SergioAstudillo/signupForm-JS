//TODO: Conseguir que el focusout funcione, de momento no deja hacer click al botón
//Display the clear button and make it work.
let input = document.querySelector('#inputEmail');

input.addEventListener('focus', function () {
    document.querySelector('#clear').style.display = 'block';
});

input.addEventListener('focusout', function () {
    document.querySelector('#clear').style.display = 'none';
});

//Input clear with button.
function clearButton() {
    input.value = '';
}

//Password hide/show button.
var defaultState = true;
function eyeButton() {
    if (defaultState) {
        document.getElementById('inputPassword').setAttribute('type', 'text');
        defaultState = false;
        document.querySelector('#eye-show').style.display = 'none';
        document.querySelector('#eye-hide').style.display = 'block';
    } else {
        document.getElementById('inputPassword').setAttribute('type', 'password');
        defaultState = true;
        document.querySelector('#eye-hide').style.display = 'none';
        document.querySelector('#eye-show').style.display = 'block';
    }
}
