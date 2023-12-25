

import { fetchPostDetails, updatePost } from './postEditing.js';

document.addEventListener('DOMContentLoaded', function() {
    const editPostForm = document.getElementById('editPostForm');
    const titleInput = document.getElementById('editPostTitle');
    const contentInput = document.getElementById('editPostContent');
    const tagsInput = document.getElementById('editPostTags');

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        console.error('Post ID not found in URL');
        return;
    }

    async function loadPostData() {
        try {
            const post = await fetchPostDetails(postId);
            titleInput.value = post.title;
            contentInput.value = post.body;
            tagsInput.value = post.tags.join(', ');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    editPostForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const tags = tagsInput.value.split(',').map(tag => tag.trim());

        try {
            const response = await updatePost(postId, {
                title: titleInput.value,
                body: contentInput.value,
                tags: tags
            });

            if (response.ok) {
                alert('Post updated successfully!');
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    });

    loadPostData();
});
