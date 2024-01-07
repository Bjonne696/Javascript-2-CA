

import { registerUser } from './userRegistration.js';
import { displaySuccessMessage, displayErrorMessage } from './messageDisplay.js';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (!/^[\w]{1,20}$/.test(name)) {
            displayErrorMessage('Invalid name. Name can only contain alphanumeric characters and underscores, and it must be less than 21 characters.');
            return;
        }

        if (!/^[a-zA-Z0-9_.]+@stud.noroff.no$/.test(email)) {
            displayErrorMessage('Please use your stud.noroff.no email address for registration.');
            return;
        }

        if (password !== confirmPassword) {
            displayErrorMessage('Passwords do not match!');
            return;
        }

        try {
            await registerUser({ name, email, password });
            displaySuccessMessage('Successfully registered. You can now log in.');
        } catch (error) {
            console.error('There was an error during registration', error);
            displayErrorMessage(error.message);
        }
    });
});

