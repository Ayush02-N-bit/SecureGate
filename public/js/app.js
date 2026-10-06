AOS.init({ duration: 1000 });

function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function openSignup() {
  document.getElementById("signupModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("signupModal").style.display = "none";
}