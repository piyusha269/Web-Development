function enableArrowNavigation(selector, numCols) {
  const items = Array.from(document.querySelectorAll(selector));

  items.forEach((item, index) => {
    item.addEventListener("keydown", (e) => {
      let nextIndex = index;

      switch (e.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % items.length;
          break;
        case "ArrowLeft":
          nextIndex = (index - 1 + items.length) % items.length;
          break;
        case "ArrowDown":
          nextIndex = index + numCols;
          if (nextIndex >= items.length) return;
          break;
        case "ArrowUp":
          nextIndex = index - numCols;
          if (nextIndex < 0) return;
          break;
        default:
          return;
      }

      e.preventDefault();
      items[nextIndex].focus();
    });
  });
}

// Call the function separately for each class
document.addEventListener("DOMContentLoaded", () => {
  enableArrowNavigation('.card', 3);        // 4-column grid
  enableArrowNavigation('.nav', 4);         // 3-column nav bar
  enableArrowNavigation('.hero-img', 1);    // maybe single image per row
  enableArrowNavigation('.features', 1);    // 2-column layout
  enableArrowNavigation('.highlights', 1);  // 2-column layout
  enableArrowNavigation('.h2', 1);
});
