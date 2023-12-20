document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';

    document.getElementById('postCreationForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        try {
            const response = await fetch(`${API_URL}/social/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken') // Assuming JWT token is stored in local storage
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                alert('Post created successfully!');
                // Optionally redirect to the feed page or clear the form
            } else {
                const errorData = await response.json();
                alert('Failed to create post: ' + errorData.message); // Display an appropriate error message
            }
        } catch (error) {
            console.error('There was an error creating the post', error);
            alert('Error creating post. Please try again.');
        }
    });
});
//not tested