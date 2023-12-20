document.addEventListener('DOMContentLoaded', function() {

    const API_URL = 'https://api.noroff.dev/api/v1';

    function displaySuccessMessage(message) {
        const successDiv = document.getElementById('successMessage');
        successDiv.textContent = message;
        successDiv.classList.remove('d-none');
    }

    function displayErrorMessage(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.classList.remove('d-none');
    }

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('loginNameInput').value;
        const email = document.getElementById('loginEmailInput').value;
        const password = document.getElementById('loginPassword').value;

        try {
            let response = await fetch(`${API_URL}/social/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                let data = await response.json();
                localStorage.setItem('userToken', data.accessToken);
                displaySuccessMessage("Logged in successfully!");
                


            } else {
                const errorData = await response.json();
                console.error('Login Failed:', errorData);
                displayErrorMessage('Error logging in. Please try again.');
            }
        } catch (error) {
            console.error('There was an error logging in', error);
            displayErrorMessage('Error logging in. Please try again.');
        }
    })
});
//errors are not handled gracefully