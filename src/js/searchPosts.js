// src/js/searchPosts.js

export function searchPosts(allPosts, searchTerm) {
    return allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) || 
        post.body.toLowerCase().includes(searchTerm) || 
        (post.tags && post.tags.join(' ').toLowerCase().includes(searchTerm))
    );
}
