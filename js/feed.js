document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';
    const postsContainer = document.getElementById('postsContainer');
    const filterSelect = document.getElementById('postFilter'); // Get the filter dropdown
    let allPosts = [];

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
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            let tagsText = post.tags.join(', ');
            const postElement = document.createElement('div');
            postElement.className = 'col-md-8 mb-4';
            postElement.id = 'post-' + post.id;
            postElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="post-id">Post ID: ${post.id}</div> <!-- Displaying Post ID -->
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

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.body.toLowerCase().includes(searchTerm) || 
            (post.tags && post.tags.join(' ').toLowerCase().includes(searchTerm))
        );
        displayPosts(filteredPosts);
    });


    function filterPosts(filterType) {
        switch (filterType) {
            case 'withTags':
                return allPosts.filter(post => post.tags.length > 0);
            case 'withoutTags':
                return allPosts.filter(post => post.tags.length === 0);
            default:
                return allPosts;
        }
    }

    filterSelect.addEventListener('change', function(event) {
        const filterType = event.target.value;
        const filteredPosts = filterPosts(filterType);
        displayPosts(filteredPosts);
    });

    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-post-btn')) {
            const postId = event.target.getAttribute('data-post-id');
            deletePost(postId);
        } else if (event.target.classList.contains('edit-post-btn')) {
            const postId = event.target.getAttribute('data-post-id');
            window.location.href = `pages/editPost.html?postId=${postId}`;
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

    fetchAndDisplayPosts();
});


//errors are not handled gracefully