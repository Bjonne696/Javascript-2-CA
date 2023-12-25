

import { API_URL } from './api.js';
import { getFromLocalStorage } from './utils.js';

export async function deletePost(postId) {
    try {
        const token = getFromLocalStorage('userToken');
        const response = await fetch(`${API_URL}/social/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
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