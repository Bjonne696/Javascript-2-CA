// src/js/logoutHandler.js

export function logoutUser() {
    localStorage.removeItem('userToken');
    window.location.href = 'pages/login.html';
}
