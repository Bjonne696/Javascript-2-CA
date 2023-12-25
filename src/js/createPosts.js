

import { createPost, API_URL } from '../api/api.js';
import { getFromLocalStorage, setToLocalStorage } from '../utils/utils.js';
import { getElementById } from '../utils/domUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    getElementById('postCreationForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = getElementById('postTitle').value;
        const body = getElementById('postContent').value;
        const tagsInput = getElementById('postTags').value;
        const tags = tagsInput.split(',').map(tag => tag.trim());

        const token = getFromLocalStorage('userToken');

        try {
            const response = await createPost({ title, body, tags }, token);
            if (response.ok) {
                alert('Post created successfully!');
             
            } else {
                const errorData = await response.json();
                alert('Failed to create post: ' + errorData.message);
            }
        } catch (error) {
            console.error('There was an error creating the post', error);
            alert('Error creating post. Please try again.');
        }
    });
});
