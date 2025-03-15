/* JS for posts */

// disable all old wordpress images in content
window.onload = function () {
  const wpImages = document.body.querySelectorAll("img");
  const wpImagesInEditor = document.body
    .querySelector("#editor")
    ?.querySelectorAll("img");

  const wpImagesArray = Array.from(wpImages || []);
  const wpImagesInEditorArray = Array.from(wpImagesInEditor || []);

  wpImagesInEditorArray.forEach((img) => {
    img.remove();
  });

  wpImagesArray.forEach((img) => {
    const imgClass = Array.from(img.classList).join("-");
    if (imgClass.includes("wp-image")) {
      img.remove();
    }
  });
};

//  delete modal posts confirmation
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".deletePost");
  const confirmDialog = document.getElementById("confirmDialog");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const overlay = document.getElementById("dialogOverlay");
  let currentDeleteUrl = ""; // Salva l'URL del post da eliminare

  // Apri il dialogo al clic su "Delete"
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      currentDeleteUrl = this.dataset.url; // Ottiene l'URL dal data attribute

      confirmDialog.showModal();
      overlay.style.display = "block"; // Mostra lo sfondo nero
    });
  });

  // Chiudi il dialogo senza eliminare
  cancelBtn.addEventListener("click", function () {
    confirmDialog.close();
    overlay.style.display = "none"; // Nasconde lo sfondo nero
  });

  // Conferma eliminazione
  confirmBtn.addEventListener("click", function () {
    fetch(currentDeleteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": "{{ .csrfToken }}", // Aggiungi il token CSRF se necessario
      },
    })
      .then((response) => {
        confirmDialog.close();
        overlay.style.display = "none"; // Nasconde lo sfondo nero
        if (response.ok) {
          alert("Post eliminato con successo!");
          location.reload(); // Ricarica la pagina o rimuovi l'elemento dalla DOM
        } else {
          alert("Errore nell'eliminazione del post.");
        }
      })
      .catch((error) => console.error("Errore:", error));
  });
});
