

import { API_URL } from '../api/api.js';
import { getFromLocalStorage } from '../utils/utils.js';

export async function fetchPostDetails(postId) {
    const token = getFromLocalStorage('userToken');
    const response = await fetch(`${API_URL}/social/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw new Error('Error fetching post data');
    }

    return await response.json();
}

export async function updatePost(postId, postData) {
    const token = getFromLocalStorage('userToken');
    const response = await fetch(`${API_URL}/social/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(postData)
    });

    return response;
}