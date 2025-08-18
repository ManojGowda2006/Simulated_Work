// Hardcoded credentials
const validEmail = "kalvian@example.com";
const validPassword = "Kalvi@123";

// DOM elements
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const togglePassword = document.getElementById("togglePassword");
const attemptInfo = document.querySelector(".attempt-info");

let attemptsLeft = 3;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Show/Hide password
togglePassword.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Validation functions
function validateEmail() {
  const errorMsg = emailInput.nextElementSibling;
  if (!emailInput.value.trim()) {
    errorMsg.textContent = "Email is required.";
    return false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    errorMsg.textContent = "Invalid email format.";
    return false;
  } else {
    errorMsg.textContent = "";
    return true;
  }
}

function validatePassword() {
  const errorMsg = passwordInput.parentElement.nextElementSibling;
  if (!passwordInput.value.trim()) {
    errorMsg.textContent = "Password is required.";
    return false;
  } else if (passwordInput.value.length < 6) {
    errorMsg.textContent = "Minimum 6 characters required.";
    return false;
  } else {
    errorMsg.textContent = "";
    return true;
  }
}

// Real-time validation
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

// Submit handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateEmail() || !validatePassword()) return;

  loginBtn.disabled = true;

  if (emailInput.value.trim() === validEmail && passwordInput.value === validPassword) {
    window.location.href = "success.html";
  } else {
    attemptsLeft--;
    attemptInfo.textContent = `Invalid credentials. Attempts left: ${attemptsLeft}`;
    loginBtn.disabled = false;
    if (attemptsLeft <= 0) {
      attemptInfo.textContent = "Too many failed attempts. Try again later.";
      loginBtn.disabled = true;
    }
  }
});
