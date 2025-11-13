/* ===============================
   OPEN YOUTUBE IN NEW TAB ONLY
================================*/
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".video-card").forEach(card => {
        card.addEventListener("click", () => {
            const videoId = card.dataset.ytid;
            const start = card.dataset.start || 0;

            const url = `https://www.youtube.com/watch?v=${videoId}&t=${start}s`;

            window.open(url, "_blank"); // NEW TAB
        });
    });
});


/* ===============================
   AUTO-SCROLL LEFT TEXT LIST
================================*/
try {
    const scrollBox = document.getElementById("sliderList");
    if (scrollBox) {
        const scrollItems = scrollBox.querySelectorAll(".scroll-item");
        let scrollIndex = 0;

        function scrollToNextItem() {
            const current = scrollItems[scrollIndex];

            scrollBox.scrollTop = current.offsetTop - scrollBox.offsetTop;
            scrollItems.forEach(i => i.classList.remove("active"));
            current.classList.add("active");

            document.getElementById("activeImage").src = current.dataset.img;

            scrollIndex = (scrollIndex + 1) % scrollItems.length;
        }

        setInterval(scrollToNextItem, 3000);
    }
} catch (_) {}


/* ===============================
  CAMPUS LIFE IMAGE SLIDER
================================*/
let pic_count = 0;

function loadpicinframe(index) {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`bigpicid${i}`).style.display = "none";
        document.getElementById(`bdr${i}`).style.border = "0px solid red";
    }
    document.getElementById(`bigpicid${index}`).style.display = "block";
    document.getElementById(`bdr${index}`).style.border = "2px solid red";
    pic_count = index;
}

function next_slider4() {
    pic_count = (pic_count + 1) % 5;
    loadpicinframe(pic_count);
}

function prev_slider4() {
    pic_count = (pic_count - 1 + 5) % 5;
    loadpicinframe(pic_count);
}

window.addEventListener("load", () => {
    if (document.getElementById("bigpicid0")) {
        loadpicinframe(0);
        setInterval(next_slider4, 5000);
    }
});


/* ===============================
   SAFE FOR ALL PAGES
================================*/
console.log("Custom Script Loaded (Open In New Tab Enabled)");
