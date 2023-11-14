const createBlogPostHandler = async (event) => {
    event.preventDefault();
    // grab post title and description input
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#content').value.trim();
    // verify there is both title and content
    if (title && description) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-type': 'application/json' },
        });
        // reload dashboard to view new post
        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
};
// event listener
document.querySelector('#post').addEventListener('click', createBlogPostHandler);
