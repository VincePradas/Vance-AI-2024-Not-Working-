function submit() {
    const name = document.querySelector('.name').value;
    const password = document.querySelector('.pass').value;
    const email = document.querySelector('.email').value;

    if (name && password && email) {
        
        const information = {
            'name': name,
            'password': password,
            'email': email
        };
        
        console.log(information);
        localStorage.setItem('formData', JSON.stringify(information));
        window.location.href = 'index.html';
        alert('Success');
    } else {
        alert('Provide Credentials to Continue.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    let subBtn = document.querySelector('.submit');
    if (subBtn) {
        subBtn.addEventListener('click', submit);
    }
});

