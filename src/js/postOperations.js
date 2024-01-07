export function displayPosts(postsContainer, posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        let tagsText = post.tags.join(', ');
        const postElement = document.createElement('div');
        postElement.className = 'col-md-8 mb-4 clickable-post';
        postElement.id = 'post-' + post.id;
        postElement.innerHTML = `
            <div class="card">
                <div class="card-body" data-post-id="${post.id}">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <p class="card-text">${tagsText}</p>
                </div>
            </div>
        `;
        postElement.addEventListener('click', function() {
            window.location.href = `pages/postDetails.html?postId=${post.id}`;
        });
        postsContainer.appendChild(postElement);
    });
}

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