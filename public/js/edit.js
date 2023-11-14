// delete blog post
const deleteBlogPostHandler = async (event) => {
    // if delete button is pressed then a delete request is sent to the blog post id url
    if (event.target.classList.contains('btn-delete')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });
        // reload dashboard after post delete
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post');
        }
    };
};

// edit blog post
const updateBlogPostHandler = async () => {
    // grab new post values along with existing blog post id
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();
    const id = document.querySelector('.btn-edit').getAttribute('data-id');
    // verify post still contains title and content
    if (title && description) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-type': 'application/json' },
        });
        // reload dashboard after updating post
        console.log(response)
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to update blog post')
        }
    };
};

// delete comment from user post
const deleteCommentHandler = async (event) => {
    // grab comment id
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
    });
    // reload blog post after comment deleted
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete comment');
    }
};

// event listeners
document.querySelector('.btn-delete').addEventListener('click', deleteBlogPostHandler);
document.querySelector('.btn-update').addEventListener('click', updateBlogPostHandler);

const commentDeleteBtn = document.querySelectorAll('.btn-delete-comment');
// event delegation for comment delete buttons
commentDeleteBtn.forEach((button) => {
    button.addEventListener('click', deleteCommentHandler);
});
