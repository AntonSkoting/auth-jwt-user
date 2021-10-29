/// Connect to login box ///
const loginForm = document.querySelector('#login');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');

/// Login Event-handeler ///
loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const data = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    fetch('/api/user/login', {
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
});