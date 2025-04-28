/* JS for posts */
let postsImagesLoaded = false;
let allImages = [];
let imagesRendered = 0;
const BATCH_SIZE = 25;

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
  dialog.showModal();
  document.getElementById("delete-confirm-dialog-overlay").style.display =
    "flex";
  dialog.scrollTop = 0;
}

function closeImagePicker() {
  document.getElementById("imageDialog").close();
  document.getElementById("delete-confirm-dialog-overlay").style.display =
    "none";
}

async function loadImages() {
  if (postsImagesLoaded) return;

  try {
    const response = await fetch("/api/images");
    allImages = await response.json();

    const galleryDiv = document.querySelector(".gallery");
    const loadMoreBtn = document.getElementById("loadMoreImagesBtn");

    galleryDiv.innerHTML = "";
    imagesRendered = 0;

    renderNextBatch();

    if (imagesRendered < allImages.length) {
      loadMoreBtn.style.display = "block";
    }

    loadMoreBtn.onclick = () => {
      renderNextBatch();
      if (imagesRendered >= allImages.length) {
        loadMoreBtn.style.display = "none";
      }
    };

    postsImagesLoaded = true;
  } catch (error) {
    console.error("Errore nel caricamento delle immagini:", error);
  }
}

// Renderizza un blocco da 25 immagini
function renderNextBatch() {
  const galleryDiv = document.querySelector(".gallery");
  const batch = allImages.slice(imagesRendered, imagesRendered + BATCH_SIZE);

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

      document.getElementById("thumbnailInput").value = "/" + image.Path;
      closeImagePicker();
    });

    galleryDiv.appendChild(imgElement);
  });

  imagesRendered += batch.length;
}

// Filtra tutte le immagini corrispondenti alla ricerca
function filterImagesModal(e) {
  const searchTerm = e.value.replace(/[-_ ]/g, "").toLowerCase();
  const galleryDiv = document.querySelector(".gallery");
  const loadMoreBtn = document.getElementById("loadMoreImagesBtn");

  galleryDiv.innerHTML = "";

  let filteredCount = 0;

  allImages.forEach((image) => {
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

        document.getElementById("thumbnailInput").value = "/" + image.Path;
        closeImagePicker();
      });

      galleryDiv.appendChild(imgElement);
      filteredCount++;
    }
  });

  loadMoreBtn.style.display =
    filteredCount === allImages.length ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(
    '[data-modal-btn="close-image-picker"]'
  );
  const openButtons = document.querySelectorAll(
    '[data-modal-btn="open-image-picker"]'
  );

  closeButtons.forEach((button) =>
    button.addEventListener("click", closeImagePicker)
  );

  openButtons.forEach((button) =>
    button.addEventListener("click", () => {
      openImagePicker();
      loadImages(); // Carica solo al primo click
    })
  );

  RemoveWordPressImages();

  loadImages();

  SearchPost();
});
