

import { loginUser } from './auth.js';
import { displaySuccessMessage, displayErrorMessage } from './messageDisplay.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('loginNameInput').value;
        const email = document.getElementById('loginEmailInput').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const data = await loginUser({ name, email, password });
            localStorage.setItem('userToken', data.accessToken);
            localStorage.setItem('userEmail', email); 
            displaySuccessMessage("Logged in successfully!");
        } catch (error) {
            console.error('There was an error logging in:', error);
            displayErrorMessage(error.message);
        }
    });
});

