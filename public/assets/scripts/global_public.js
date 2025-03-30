document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navbarNav = document.getElementById("navbarNav");
  const overlay = document.querySelector(".overlay");

  navToggle.addEventListener("click", function () {
    navbarNav.classList.toggle("show");
    overlay.classList.toggle("show");
  });

  overlay.addEventListener("click", function () {
    navbarNav.classList.remove("show");
    overlay.classList.remove("show");
  });
});
