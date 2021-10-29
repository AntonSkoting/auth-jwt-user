/// Connect to register box ///
const registerForm = document.querySelector('#register');
const registerName = document.querySelector('#register-name');
const registerEmail = document.querySelector('#register-email');
const registerPassword1 = document.querySelector('#register-password-1');
const registerPassword2 = document.querySelector('#register-password-2');


/// Register Event-handeler ///
registerForm.addEventListener('submit', event => {
    event.preventDefault();

    if (registerPassword1.value != registerPassword2.value) {
        alert('Passwords dont match.');
    } else {
        const data = {
            name: registerName.value,
            email: registerEmail.value,
            password: registerPassword1.value
        }

        fetch('/api/user/register', {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => { return res.json() }).then(result => {

            const { error } = result;
            if (error) { alert(error) }
            else {
                location.href = result.redirect;
            }
        }).catch(error => { alert(error.message) });
    }
});