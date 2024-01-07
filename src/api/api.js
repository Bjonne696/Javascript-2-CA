

export const API_URL = 'https://api.noroff.dev/api/v1';

export async function fetchPost(postId, token) {
    const response = await fetch(`${API_URL}/social/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    return response;
}

export async function createPost(data, token) {
    const response = await fetch(`${API_URL}/social/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    return response;
}


