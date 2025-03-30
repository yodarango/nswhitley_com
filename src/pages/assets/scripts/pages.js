function toggleAboutMeText() {
  const aboutMeText = document.querySelector("#text-about-me");
  const aboutMeButton = document.querySelector("#about-me-btn");

  if (aboutMeText.classList.contains("post-text")) {
    aboutMeText.classList.remove("post-text");
    aboutMeButton.innerHTML = "Read Less";
  } else {
    aboutMeText.classList.add("post-text");
    aboutMeButton.innerHTML = "Read More";
  }
}

function SearchPostFunctionality() {
  const input = document.getElementById("search-in-posts");
  const listItems = document.querySelectorAll(".all-posts-list li");

  input.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    listItems.forEach((li) => {
      const title = li.getAttribute("data-title")?.toLowerCase() || "";
      const text = li.getAttribute("data-text")?.toLowerCase() || "";

      if (title.includes(query) || text.includes(query)) {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    });
  });
}

// on load add function to button
document.addEventListener("DOMContentLoaded", function () {
  const aboutMeButton = document.querySelector("#about-me-btn");
  aboutMeButton.addEventListener("click", toggleAboutMeText);

  const searchInput = document.querySelector("#search-in-posts");
  if (searchInput) {
    searchInput.addEventListener("input", SearchPostFunctionality);
  }
});
