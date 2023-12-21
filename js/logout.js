document.getElementById('logoutButton').addEventListener('click', function() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('userToken');

        // Redirect to the login page with a query parameter
        window.location.href = 'pages/login.html';
    }
});