

import { API_URL } from '../api/api.js';

export async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/social/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log in');
    }

    return await response.json();
}
