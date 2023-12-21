// src/index.js

import { API_URL, fetchPost } from './api/api.js';
import { getFromLocalStorage } from './utils/utils.js';
import { displayPosts } from './js/postOperations.js';
import { searchPosts } from './js/searchPosts.js';
import { filterPosts } from './js/filterPostModule.js';

document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const filterSelect = document.getElementById('postFilter');
    let allPosts = [];

    async function fetchAndDisplayPosts() {
        try {
            const token = getFromLocalStorage('userToken');
            const response = await fetchPost('', token);

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            allPosts = await response.json();
            displayPosts(postsContainer, allPosts);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPosts = searchPosts(allPosts, searchTerm);
        displayPosts(postsContainer, filteredPosts);
    });

    filterSelect.addEventListener('change', function(event) {
        const filterType = event.target.value;
        const filteredPosts = filterPosts(allPosts, filterType);
        displayPosts(postsContainer, filteredPosts);
    });

    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-post-btn')) {
            const postId = event.target.getAttribute('data-post-id');
            window.location.href = `pages/editPost.html?postId=${postId}`;
        }
    });

    fetchAndDisplayPosts();
});

//errors are not handled gracefully