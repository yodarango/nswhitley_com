document.addEventListener("DOMContentLoaded", () => {
  HandleAdminMenu();
});

// admin menu
function HandleAdminMenu() {
  // Toggle menu su mobile
  const navToggle = document.querySelector(".nav-toggle");
  const admin = document.querySelector(".admin");
  const overlay = document.querySelector(".overlay");

  navToggle.addEventListener("click", function () {
    admin.classList.toggle("show");
    overlay.classList.toggle("show");
  });

  // Chiudi menu se si clicca su overlay
  overlay.addEventListener("click", function () {
    admin.classList.remove("show");
    overlay.classList.remove("show");
  });
}
