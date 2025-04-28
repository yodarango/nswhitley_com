/* JS for posts */
// Check if variables are already defined to prevent duplicate declaration errors
if (typeof window.postsImagesLoaded === "undefined") {
  window.postsImagesLoaded = false;
  window.allImages = [];
  window.imagesRendered = 0;
  window.BATCH_SIZE = 25;
}

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

// search post functionality
function SearchPost() {
  const searchInput = document.querySelector('input[name="filter"]');

  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const rows = document.querySelectorAll("tr:not(.tr-head)");

    // Skip the header row
    rows.forEach((row) => {
      if (row.querySelector('td[data-label="Name"]')) {
        const nameCell = row.querySelector('td[data-label="Name"]');
        const postName = nameCell.textContent.toLowerCase().trim();

        if (postName.includes(searchTerm) || searchTerm === "") {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    });
  });
}

// Apri modale
function openImagePicker() {
  const dialog = document.getElementById("imageDialog");
  if (!dialog) return;

  dialog.showModal();

  const overlay = document.getElementById("delete-confirm-dialog-overlay");
  if (overlay) {
    overlay.style.display = "flex";
  }

  dialog.scrollTop = 0;
}

function closeImagePicker() {
  const dialog = document.getElementById("imageDialog");
  if (dialog) {
    dialog.close();
  }

  const overlay = document.getElementById("delete-confirm-dialog-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

async function loadImages() {
  if (window.postsImagesLoaded) return;

  try {
    const response = await fetch("/api/images");
    window.allImages = await response.json();

    const galleryDiv = document.querySelector(".gallery");
    if (!galleryDiv) return;

    const loadMoreBtn = document.getElementById("loadMoreImagesBtn");
    if (!loadMoreBtn) return;

    galleryDiv.innerHTML = "";
    window.imagesRendered = 0;

    renderNextBatch();

    if (window.imagesRendered < window.allImages.length) {
      loadMoreBtn.style.display = "block";
    }

    loadMoreBtn.onclick = () => {
      renderNextBatch();
      if (window.imagesRendered >= window.allImages.length) {
        loadMoreBtn.style.display = "none";
      }
    };

    window.postsImagesLoaded = true;
  } catch (error) {
    console.error("Errore nel caricamento delle immagini:", error);
  }
}

// Renderizza un blocco da 25 immagini
function renderNextBatch() {
  const galleryDiv = document.querySelector(".gallery");
  if (!galleryDiv || !window.allImages) return;

  const batch = window.allImages.slice(
    window.imagesRendered,
    window.imagesRendered + window.BATCH_SIZE
  );

  batch.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = "/uploads/" + image.Path;
    imgElement.alt = image.Name;
    imgElement.style.width = "100px";
    imgElement.style.cursor = "pointer";

    imgElement.addEventListener("click", function () {
      const imageThumb = document.getElementById("selectedThumbnail");
      const imageThumbPlaceholder =
        document.querySelector(".image-placeholder");

      if (imageThumb) {
        imageThumb.src = imgElement.src;
        imageThumb.classList.add("d-block");
        imageThumb.classList.remove("d-none");
      }

      if (imageThumbPlaceholder) {
        imageThumbPlaceholder.classList.add("d-none");
        imageThumbPlaceholder.classList.remove("d-block");
      }

      const thumbnailInput = document.getElementById("thumbnailInput");
      if (thumbnailInput) {
        thumbnailInput.value = "/" + image.Path;
      }

      closeImagePicker();
    });

    galleryDiv.appendChild(imgElement);
  });

  window.imagesRendered += batch.length;
}

// Filtra tutte le immagini corrispondenti alla ricerca
function filterImagesModal(e) {
  if (!e || !e.value) return;

  const searchTerm = e.value.replace(/[-_ ]/g, "").toLowerCase();
  const galleryDiv = document.querySelector(".gallery");
  if (!galleryDiv) return;

  const loadMoreBtn = document.getElementById("loadMoreImagesBtn");
  if (!loadMoreBtn) return;

  galleryDiv.innerHTML = "";

  let filteredCount = 0;

  if (!window.allImages || !Array.isArray(window.allImages)) return;

  window.allImages.forEach((image) => {
    const postName = image.Name.toLowerCase().replace(/[-_ ]/g, "");

    if (postName.includes(searchTerm)) {
      const imgElement = document.createElement("img");
      imgElement.src = "/uploads/" + image.Path;
      imgElement.alt = image.Name;
      imgElement.style.width = "100px";
      imgElement.style.cursor = "pointer";

      imgElement.addEventListener("click", function () {
        const imageThumb = document.getElementById("selectedThumbnail");
        const imageThumbPlaceholder =
          document.querySelector(".image-placeholder");

        if (imageThumb) {
          imageThumb.src = imgElement.src;
          imageThumb.classList.add("d-block");
          imageThumb.classList.remove("d-none");
        }

        if (imageThumbPlaceholder) {
          imageThumbPlaceholder.classList.add("d-none");
          imageThumbPlaceholder.classList.remove("d-block");
        }

        const thumbnailInput = document.getElementById("thumbnailInput");
        if (thumbnailInput) {
          thumbnailInput.value = "/" + image.Path;
        }

        closeImagePicker();
      });

      galleryDiv.appendChild(imgElement);
      filteredCount++;
    }
  });

  loadMoreBtn.style.display =
    filteredCount === window.allImages.length ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  // Only run RemoveWordPressImages if #editor exists
  if (document.querySelector("#editor")) {
    RemoveWordPressImages();
  }

  // Only set up image picker if the elements exist
  const closeButtons = document.querySelectorAll(
    '[data-modal-btn="close-image-picker"]'
  );
  const openButtons = document.querySelectorAll(
    '[data-modal-btn="open-image-picker"]'
  );

  if (closeButtons.length > 0) {
    closeButtons.forEach((button) =>
      button.addEventListener("click", closeImagePicker)
    );
  }

  if (openButtons.length > 0) {
    openButtons.forEach((button) =>
      button.addEventListener("click", () => {
        openImagePicker();
        loadImages(); // Carica solo al primo click
      })
    );

    // Only load images if we have image picker buttons
    loadImages();
  }

  // Only run search if we have a search input
  if (document.querySelector('input[name="filter"]')) {
    SearchPost();
  }
});
