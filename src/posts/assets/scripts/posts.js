/* JS for posts */

document.addEventListener("DOMContentLoaded", () => {
  RemoveWordPressImages();
  // aspetta un puo prima di scaricare questo
  setTimeout(() => {
    loadImages();
  }, 5000);
  SearchPost();
});

// disable all old wordpress images in content
function RemoveWordPressImages() {
  const wpImages = document.body.querySelectorAll("img");
  const wpImagesInEditor = document.body
    .querySelector("#editor")
    ?.querySelectorAll("img");

  if (!wpImages || !wpImagesInEditor) return;

  const wpImagesArray = Array.from(wpImages || []);
  const wpImagesInEditorArray = Array.from(wpImagesInEditor || []);

  wpImagesInEditorArray.forEach((img) => {
    if (img.src.startsWith("data:image/")) return;
    img.remove();
  });

  wpImagesArray.forEach((img) => {
    const imgClass = Array.from(img.classList).join("-");
    if (imgClass.includes("wp-image")) {
      img.remove();
    }
  });
}

//  delete modal posts confirmation
function DeleteModalConfirmation(id) {
  const confirmDialog = document.getElementById(`confirmDialog-${id}`);
  const overlay = document.getElementById(`dialogOverlay-${id}`);
  const cancelBtn = confirmDialog.querySelector("#cancelBtn");

  // Apri il modal
  confirmDialog.style.display = "flex";
  overlay.style.display = "flex";

  // Chiudi il modal senza eliminare
  cancelBtn.addEventListener("click", function () {
    confirmDialog.style.display = "none";
    overlay.style.display = "none"; // Nasconde lo sfondo nero
  });
}

// search post functionality
function SearchPost() {
  const searchInput = document.querySelector('input[name="filter"]');
  const rows = document.querySelectorAll(".row-post-name");

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    rows.forEach((row) => {
      const postName = row.dataset.postName.toLowerCase().trim();

      // Mostra solo le righe che corrispondono alla ricerca
      if (postName.includes(searchTerm)) {
        row.parentElement.style.display = ""; // Mostra la riga
      } else {
        row.parentElement.style.display = "none"; // Nasconde la riga
      }
    });
  });
}
