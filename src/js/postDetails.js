document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';
    const postDetailsContainer = document.getElementById('postDetailsContainer');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    async function fetchAndDisplayPost() {
        try {
            const response = await fetch(`${API_URL}/social/posts/${postId}?_author=true`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
    
            const post = await response.json();
            displayPostDetails(post);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    

    function displayPostDetails(post) {
        let tagsText = post.tags.join(', ');
        const currentUserEmail = localStorage.getItem('userEmail'); 
    
        const isUserAuthor = post.author && post.author.email === currentUserEmail;
    
        postDetailsContainer.innerHTML = `
            <div class="col-md-8 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <p class="card-text">${tagsText}</p>
                        ${isUserAuthor ? `
                        <button class="btn btn-primary edit-post-btn" data-post-id="${post.id}">Edit</button>
                        <button class="btn btn-danger delete-post-btn" data-post-id="${post.id}">Delete</button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    

    postDetailsContainer.addEventListener('click', function(event) {
        const postId = event.target.getAttribute('data-post-id');
        if (event.target.classList.contains('edit-post-btn')) {
            window.location.href = `editPost.html?postId=${postId}`;
        } else if (event.target.classList.contains('delete-post-btn')) {
            deletePost(postId);
        }
    });

    async function deletePost(postId) {
        try {
            const response = await fetch(`${API_URL}/social/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            });
    
            if (response.ok) {
                document.getElementById('post-' + postId).remove();
                console.log('Post deleted successfully');
            } else {
                console.error('Failed to delete post:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    fetchAndDisplayPost();
});


