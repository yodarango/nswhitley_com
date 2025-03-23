document.addEventListener("DOMContentLoaded", function () {
  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // In a real implementation, you would send the form data to a server
      // For this demo, we'll just show the success message
      contactForm.style.display = "none";
      formSuccess.classList.remove("hidden");
    });
  }

  // Subscribe form handling
  const subscribeForm = document.getElementById("subscribe-form");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // In a real implementation, you would send the form data to a server
      // For this demo, we'll just show an alert
      alert("Thank you for subscribing!");
      subscribeForm.reset();
    });
  }

  // Article filtering
  const searchInput = document.getElementById("search-articles");
  const categorySelect = document.getElementById("category-select");
  const articlesContainer = document.getElementById("articles-container");

  if (searchInput && categorySelect && articlesContainer) {
    const articles = articlesContainer.querySelectorAll(".article-card");

    function filterArticles() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categorySelect.value;

      articles.forEach((article) => {
        const title = article.querySelector("h3").textContent.toLowerCase();
        const content = article.querySelector("p").textContent.toLowerCase();
        const categories = article.dataset.category.split(" ");

        const matchesSearch =
          title.includes(searchTerm) || content.includes(searchTerm);
        const matchesCategory =
          selectedCategory === "all" || categories.includes(selectedCategory);

        if (matchesSearch && matchesCategory) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    }

    searchInput.addEventListener("input", filterArticles);
    categorySelect.addEventListener("change", filterArticles);
  }

  // Load more articles button
  const loadMoreButton = document.getElementById("load-more");

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", function () {
      // In a real implementation, you would fetch more articles from a server
      alert(
        "In a real implementation, this would load more articles from the server."
      );
    });
  }

  // Mobile navigation
  const header = document.querySelector("header");

  if (header) {
    const mobileNavToggle = document.createElement("button");
    mobileNavToggle.classList.add("mobile-nav-toggle");
    mobileNavToggle.setAttribute("aria-label", "Toggle navigation menu");
    mobileNavToggle.innerHTML = "Menu";

    const nav = header.querySelector("nav");

    if (window.innerWidth < 768) {
      nav.style.display = "none";
      header.querySelector(".container").appendChild(mobileNavToggle);

      mobileNavToggle.addEventListener("click", function () {
        if (nav.style.display === "none") {
          nav.style.display = "block";
          mobileNavToggle.innerHTML = "Close";
        } else {
          nav.style.display = "none";
          mobileNavToggle.innerHTML = "Menu";
        }
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth < 768) {
        if (!header.contains(mobileNavToggle)) {
          nav.style.display = "none";
          header.querySelector(".container").appendChild(mobileNavToggle);
        }
      } else {
        nav.style.display = "block";
        if (header.contains(mobileNavToggle)) {
          mobileNavToggle.remove();
        }
      }
    });
  }
});
