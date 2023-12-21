document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';
    const editPostForm = document.getElementById('editPostForm');
    const titleInput = document.getElementById('editPostTitle');
    const contentInput = document.getElementById('editPostContent');
    const tagsInput = document.getElementById('editPostTags');

    // Extract postId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    // Ensure postId is available
    if (!postId) {
        console.error('Post ID not found in URL');
        return;
    }

    // Fetch post details and populate form
    async function loadPostData() {
        try {
            const response = await fetch(`${API_URL}/social/posts/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching post data');
            }

            const post = await response.json();
            titleInput.value = post.title;
            contentInput.value = post.body;
            tagsInput.value = post.tags.join(', '); // Display the tags
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Update post on form submit
    editPostForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const tags = tagsInput.value.split(',').map(tag => tag.trim()); // Process the tags

        try {
            const response = await fetch(`${API_URL}/social/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify({
                    title: titleInput.value,
                    body: contentInput.value,
                    tags: tags // Include tags in the update
                })
            });

            if (response.ok) {
                alert('Post updated successfully!');
                // Optionally redirect to the posts page or show a success message
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    });

    loadPostData();
});
