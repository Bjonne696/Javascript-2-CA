document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://api.noroff.dev/api/v1';
    const editPostForm = document.getElementById('editPostForm');
    const postIdInput = document.getElementById('postId');
    const titleInput = document.getElementById('editPostTitle');
    const contentInput = document.getElementById('editPostContent');

    // Extract postId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    postIdInput.value = postId;

    // Fetch post details and populate form
    async function loadPostData() {
        try {
            const response = await fetch(`${API_URL}/social/posts/${post.id}`, {
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
            contentInput.value = post.body; // Replace 'body' with the correct property from your API response
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Update post on form submit
    editPostForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/social/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify({
                    title: titleInput.value,
                    body: contentInput.value // Replace 'body' with the correct property for your API
                })
            });

            if (response.ok) {
                alert('Post updated successfully!');
                // Redirect to the posts page or show a success message
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    });

    loadPostData();
});
