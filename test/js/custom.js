  const scrollBox = document.getElementById("sliderList");
  const scrollItems = scrollBox.querySelectorAll(".scroll-item");
  let scrollIndex = 0;
  function scrollToNextItem() {
  const current = scrollItems[scrollIndex];

    // Scroll to current item
    scrollBox.scrollTop = current.offsetTop - scrollBox.offsetTop;

    // Highlight current item
    scrollItems.forEach(i => i.classList.remove("active"));
    current.classList.add("active");

    // Change left image
    document.getElementById("activeImage").src = current.getAttribute("data-img");

    // Move to next
    scrollIndex++;
    if (scrollIndex >= scrollItems.length) {
      scrollIndex = 0; // loop back to top
    }
  }

  // Auto-scroll every 3 seconds
  setInterval(scrollToNextItem, 3000);