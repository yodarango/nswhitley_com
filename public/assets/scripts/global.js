//  delete modal posts confirmation
function DeleteModalConfirmation(id = "none") {
  const deleteConfirmDialog = document.getElementById(
    `delete-confirm-dialog-${id}`
  );
  const overlay = document.getElementById(
    `delete-confirm-dialog-overlay-${id}`
  );
  const deleteConfirmDialogCancelBtn = deleteConfirmDialog.querySelector(
    `#delete-confirm-dialog-overlay-${id} #delete-confirm-dialog-cancel-btn`
  );

  // Apri il modal
  deleteConfirmDialog.style.display = "flex";
  overlay.style.display = "flex";

  // Chiudi il modal senza eliminare
  deleteConfirmDialogCancelBtn.addEventListener("click", function () {
    deleteConfirmDialog.style.display = "none";
    overlay.style.display = "none"; // Nasconde lo sfondo nero
  });
}

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
