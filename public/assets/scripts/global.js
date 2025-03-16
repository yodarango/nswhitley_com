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
