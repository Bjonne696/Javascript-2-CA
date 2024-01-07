

import { logoutUser } from './logoutHandler.js';

document.getElementById('logoutButton').addEventListener('click', function() {
    if (confirm("Are you sure you want to logout?")) {
        logoutUser();
    }
});
