document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';
    const postsContainer = document.getElementById('postsContainer');
    let allPosts = []; // To store all posts

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

            allPosts = await response.json();
            displayPosts(allPosts);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    function displayPosts(posts) {
        postsContainer.innerHTML = ''; // Clear existing posts
    
        posts.forEach(post => {
            let tagsText = post.tags.join(', ');
            const postElement = document.createElement('div');
            postElement.className = 'col-md-8 mb-4';
            postElement.id = 'post-' + post.id;
            postElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <p class="card-text">${tagsText}</p>
                        <button class="btn btn-primary edit-post-btn" data-post-id="${post.id}">Edit</button>
                        <button class="btn btn-danger delete-post-btn" data-post-id="${post.id}">Delete</button>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    function filterPosts(searchText) {
        return allPosts.filter(post => {
            const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
            const titleMatch = post.title.toLowerCase().includes(searchText.toLowerCase());
            return tagsMatch || titleMatch;
        });
    }

    document.getElementById('searchInput').addEventListener('input', function(event) {
        const searchText = event.target.value;
        const filteredPosts = filterPosts(searchText);
        displayPosts(filteredPosts);
    });

    //delete function

    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-post-btn')) {
            const postId = event.target.getAttribute('data-post-id');
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

    //edit function

    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-post-btn')) {
            const postId = event.target.getAttribute('data-post-id');
            window.location.href = `pages/editPost.html?postId=${postId}`; // Assuming you have an editPost.html
        }
    });


    fetchAndDisplayPosts();
});

//errors are not handled gracefully