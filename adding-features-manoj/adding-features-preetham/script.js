const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    alert(`Login successful! Welcome, ${email}`);
    window.location.href = "tasks.html"; // redirect to task app
  } else {
    alert("Please fill in both fields");
  }
});
