

import { getUrlParameter } from './urlParams.js';

document.addEventListener('DOMContentLoaded', function() {
    const logoutSuccess = getUrlParameter('logout');
    const loginMessageDiv = document.getElementById('loginMessage');

    if (logoutSuccess === 'success') {
        loginMessageDiv.textContent = 'Logged out successfully.';
        loginMessageDiv.style.display = 'block';
    }
});
