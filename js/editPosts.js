document.addEventListener('DOMContentLoaded', function() {


    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-post-btn')) {
            const postId = event.target.getAttribute('data-post-id');
            window.location.href = `pages/editPost.html?postId=${postId}`; 
        }
    });

});