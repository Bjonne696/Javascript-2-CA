

export function filterPosts(allPosts, filterType) {
    switch (filterType) {
        case 'withTags':
            return allPosts.filter(post => post.tags.length > 0);
        case 'withoutTags':
            return allPosts.filter(post => post.tags.length === 0);
        default:
            return allPosts;
    }
}
