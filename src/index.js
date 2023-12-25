
import { API_URL, fetchPost } from './api/api.js';
import { getFromLocalStorage } from './utils/utils.js';
import { displayPosts } from './js/postOperations.js';
import { searchPosts } from './js/searchPosts.js';
import { filterPosts } from './js/filterPostModule.js';

document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const filterSelect = document.getElementById('postFilter');
    const searchInput = document.getElementById('searchInput');
    const registerButton = document.querySelector('a[href="pages/register.html"]');
    const loginButton = document.querySelector('a[href="pages/login.html"]');
    const logoutButton = document.getElementById('logoutButton');
    const createPostButton = document.querySelector('a[href="pages/posts.html"]');
    let allPosts = [];


    function toggleVisibility() {
        const isLoggedIn = getFromLocalStorage('userToken');
        if (isLoggedIn) {
            registerButton.style.display = 'none';
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
            createPostButton.style.display = 'inline-block';
            postsContainer.style.display = 'block';
            filterSelect.style.display = 'block';
            searchInput.style.display = 'block';
        } else {
            registerButton.style.display = 'inline-block';
            loginButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
            createPostButton.style.display = 'none';
            postsContainer.style.display = 'none';
            filterSelect.style.display = 'none';
            searchInput.style.display = 'none';
        }
    }
    
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

    toggleVisibility(); 
    fetchAndDisplayPosts();
});
