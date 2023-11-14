// log out user
const logoutHandler = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// event listener, verifies document is completely parsed 
document.querySelector('#logout').addEventListener('click', logoutHandler)