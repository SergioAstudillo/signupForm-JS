//Displays and hides the clear button depending on the focus.
let input = document.querySelector('#inputEmail');

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

//Password dynamic hide/show button.
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
