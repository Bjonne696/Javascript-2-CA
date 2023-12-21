document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const logoutSuccess = urlParams.get('logout');
    const loginMessageDiv = document.getElementById('loginMessage');

    if (logoutSuccess === 'success') {
        loginMessageDiv.textContent = 'Logged out successfully.';
        loginMessageDiv.style.display = 'block';
    }
});