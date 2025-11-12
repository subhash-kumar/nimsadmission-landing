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





// NIMS Campus Life Gallery Script
let pic_count = 0;

// Function to show image based on clicked thumbnail
function loadpicinframe(index) {
  // Hide all big images
  for (let i = 0; i < 5; i++) {
    document.getElementById(`bigpicid${i}`).style.display = "none";
    document.getElementById(`bdr${i}`).style.border = "0px solid red";
  }

  // Show the selected one
  document.getElementById(`bigpicid${index}`).style.display = "block";
  document.getElementById(`bdr${index}`).style.border = "2px solid red";

  // Update current index
  pic_count = index;
}

// Optional: Auto slideshow
function next_slider4() {
  pic_count = (pic_count + 1) % 5;
  loadpicinframe(pic_count);
}

function prev_slider4() {
  pic_count = (pic_count - 1 + 5) % 5;
  loadpicinframe(pic_count);
}

// Auto-slide every 5 seconds
function repeatFunction() {
  next_slider4();
  setTimeout(repeatFunction, 5000);
}

window.addEventListener("load", () => {
  loadpicinframe(0); // start with first image
  repeatFunction();
});



