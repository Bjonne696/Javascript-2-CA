export function searchPosts(allPosts, searchTerm) {
    return allPosts.filter(post => {
        const title = post.title ? post.title.toLowerCase() : '';
        const body = post.body ? post.body.toLowerCase() : '';
        const tags = post.tags ? post.tags.join(' ').toLowerCase() : '';

        return title.includes(searchTerm) || body.includes(searchTerm) || tags.includes(searchTerm);
    });
}