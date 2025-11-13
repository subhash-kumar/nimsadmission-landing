/* ================================
      LOAD YOUTUBE IFRAME API
================================ */
let YT_API_READY = false;
const players = new Map();

function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}
loadYouTubeAPI();

window.onYouTubeIframeAPIReady = function () {
  YT_API_READY = true;
};



/* =====================================================
      1. INLINE VIDEO TILE PLAYER (Live NIMS Life)
===================================================== */
function playInTile(card) {
  if (!YT_API_READY) return;

  const videoId = card.dataset.ytid;
  const start = parseInt(card.dataset.start || "0", 10);
  const host = card.querySelector(".player-host");

  // Stop other videos
  players.forEach((p, el) => {
    if (el !== card && p.stopVideo) p.stopVideo();
    if (el !== card) resetTile(el);
  });

  // If player already exists, just play
  if (players.has(card)) {
    const p = players.get(card);
    card.classList.add("playing");
    p.seekTo(start, true);
    p.playVideo();
    return;
  }

  // Create new player
  const holder = document.createElement("div");
  host.innerHTML = "";
  host.appendChild(holder);

  const player = new YT.Player(holder, {
    videoId,
    host: "https://www.youtube-nocookie.com",
    playerVars: {
      autoplay: 1,
      start,
      rel: 0,
      playsinline: 1,
      modestbranding: 1,
      controls: 1
    },
    events: {
      onReady: () => {
        card.classList.add("playing");
        player.playVideo();
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) resetTile(card);
      },
      onError: () => {
        resetTile(card);
        window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
      }
    }
  });

  players.set(card, player);
}

function resetTile(card) {
  card.classList.remove("playing");
  const host = card.querySelector(".player-host");
  host.innerHTML = "";

  if (players.has(card)) {
    try {
      players.get(card).destroy();
    } catch (_) {}
    players.delete(card);
  }
}

// Bind click to video cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => playInTile(card));
  });
});



/* =====================================================
      2. COURSE MODAL DATA HANDLING
===================================================== */
const COURSE_DATA = { /* --- YOUR ORIGINAL COURSE DATA HERE --- */ };

function fillList(elId, items) {
  const ul = document.getElementById(elId);
  if (!ul) return;
  ul.innerHTML = "";
  (items || []).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".openCourseModal").forEach((el) => {
    el.addEventListener("click", () => {
      const key = el.dataset.course;
      const data = COURSE_DATA[key];

      if (!data) return;

      document.getElementById("modalCourseName").textContent = data.title;

      fillList("col-left-ug", data.UG);
      fillList("col-left-int", data.INTEGRATED);
      fillList("col-right-pg", data.PG);
      fillList("col-right-phd", data.PHD);

      new bootstrap.Modal(document.getElementById("courseModal")).show();
    });
  });
});



/* =====================================================
      3. LAB SCROLLER (Horizontal Card Scroll)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const scroller = document.getElementById("labScroller");
  const prevBtn = document.querySelector(".lab-nav.prev");
  const nextBtn = document.querySelector(".lab-nav.next");
  if (!scroller || !prevBtn || !nextBtn) return;

  function oneStep() {
    const first = scroller.querySelector(".lab-tile");
    if (!first) return scroller.clientWidth;
    const rect = first.getBoundingClientRect();
    return rect.width + 16; // gap included
  }

  function scrollByStep(dir = 1) {
    scroller.scrollBy({ left: oneStep() * dir, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByStep(-1));
  nextBtn.addEventListener("click", () => scrollByStep(1));
});



/* =====================================================
      4. AUTO SCROLL SECTION (Slider List)
===================================================== */
const scrollBox = document.getElementById("sliderList");
if (scrollBox) {
  const scrollItems = scrollBox.querySelectorAll(".scroll-item");
  let scrollIndex = 0;

  function scrollToNextItem() {
    const current = scrollItems[scrollIndex];
    scrollBox.scrollTop = current.offsetTop - scrollBox.offsetTop;

    scrollItems.forEach((i) => i.classList.remove("active"));
    current.classList.add("active");

    document.getElementById("activeImage").src = current.dataset.img;

    scrollIndex = (scrollIndex + 1) % scrollItems.length;
  }

  setInterval(scrollToNextItem, 3000);
}



/* =====================================================
      5. LOGO MARQUEE (Infinite Scroll)
===================================================== */
(function () {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const track = slider.querySelector(".slide-track");
  if (!track) return;

  if (!track.dataset.cloned) {
    const originalSlides = [...track.children];
    const clones = originalSlides.map((n) => n.cloneNode(true));
    track.append(...clones);
    track.dataset.cloned = "true";
  }

  function setVars() {
    const distance = track.scrollWidth / 2;
    const SPEED = 120;
    const duration = distance / SPEED;

    track.style.setProperty("--nims-distance", distance + "px");
    track.style.setProperty("--nims-duration", duration + "s");
  }

  const imgs = track.querySelectorAll("img");
  let pending = imgs.length;
  if (pending === 0) setVars();
  else {
    imgs.forEach((img) => {
      if (img.complete) {
        if (--pending === 0) setVars();
      } else {
        img.onload = img.onerror = () => {
          if (--pending === 0) setVars();
        };
      }
    });
  }
})();
