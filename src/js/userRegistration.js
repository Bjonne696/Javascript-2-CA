

import { API_URL } from '../api/api.js';

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/social/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message || 'Registration failed');
    }

    return await response.json();
}
