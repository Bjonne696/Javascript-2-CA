document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';
    const postsContainer = document.getElementById('postsContainer');

    async function fetchAndDisplayPosts() {
        try {
            const response = await fetch(`${API_URL}/social/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function displayPosts(posts) {
        postsContainer.innerHTML = ''; // Clear existing posts

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'col-md-8 mb-4';
            postElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.content}</p>
                        <!-- Add more elements like edit, delete buttons as needed -->
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    fetchAndDisplayPosts();
});
//errors are not handled gracefully