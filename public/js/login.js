// register user
const signupFormHandler = async (event) => {
  event.preventDefault();
  // grab sign up form input values
  const name = document.querySelector('#signupUsername').value.trim();
  const email = document.querySelector('#signupEmail').value.trim();
  const password = document.querySelector('#signupPassword').value.trim();
  // verify user data
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // send user to dashboard after authenticated
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// log in user
const loginFormHandler = async (event) => {
  event.preventDefault();
  // grab log in form values
  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // send user to dashboard after authenticated
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Incorrect Email or Password.');
    }
  }
};

// event listeners
document.querySelector('#signupbtn').addEventListener('click', signupFormHandler);
document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
