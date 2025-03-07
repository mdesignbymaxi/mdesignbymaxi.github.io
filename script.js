// Admin Panel Password Check
const adminForm = document.getElementById('admin-form');
const password = 'admin123'; // Set your password here

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPassword = document.getElementById('password').value;

    if (enteredPassword === password) {
        window.location.href = 'admin-panel.html'; // Redirect to admin panel
    } else {
        alert('Incorrect password. Please try again.');
    }
});
