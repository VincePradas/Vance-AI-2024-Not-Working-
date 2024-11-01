
function login(event) {
    event.preventDefault();

    const username = document.querySelector('.name').value;
    const password = document.querySelector('.pass').value;
    const formDataStr = localStorage.getItem('formData');

    if (formDataStr) {
        const formData = JSON.parse(formDataStr);
        const data = {
            'name':formData.name,
            'password':formData.password,
            'email':formData.email
        }
        if (username === formData.name && password === formData.password) {
            console.log(data);
            alert('Login successful! Redirecting to homepage.');
            window.location.href = 'main.html';
        } else {
            alert('Incorrect username or password. Please try again.');
        }
    } else {
        alert('No user data found. Please sign up first.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', login);
});
