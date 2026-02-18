/**
 * Bella SPA navigation + continuous audio
 * - Keeps audio playing across "pages" by staying on one HTML file.
 * - Starts audio on the first user interaction (required by most browsers).
 */

const sections = Array.from(document.querySelectorAll(".section"));
const audio = document.getElementById("audio");
audio.volume = 0.5; 

let audioStarted = false;



function show(id) {
  sections.forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function fadeAndEnter() {
  const fadeDuration = 1000; // 1 second
  const fadeInterval = 50;
  const steps = fadeDuration / fadeInterval;
  const volumeStep = audio.volume / steps;

  const fadeOut = setInterval(() => {
    if (audio.volume > volumeStep) {
      audio.volume -= volumeStep;
    } else {
      clearInterval(fadeOut);
      audio.volume = 0;
      audio.pause();

      // After fade completes, go to Zoom
      window.location.href = "https://us05web.zoom.us/j/9894612516";
    }
  }, fadeInterval);
}

function fadeAndEscape() {
  const fadeDuration = 1000; // 1 second
  const fadeInterval = 50;
  const steps = fadeDuration / fadeInterval;
  const volumeStep = audio.volume / steps;

  const fadeOut = setInterval(() => {
    if (audio.volume > volumeStep) {
      audio.volume -= volumeStep;
    } else {
      clearInterval(fadeOut);
      audio.volume = 0;
      audio.pause();

      // After fade completes, go to Escape Room
      window.location.href = "https://www.enchambered.com/puzzles/alone-together/";
    }
  }, fadeInterval);
}



// Start music once, on first click/tap.
async function startMusicOnce() {
  if (audioStarted) return;
  audioStarted = true;

  // Volume: tune here
  audio.volume = 0.32;

  try {
    await audio.play();
  } catch (e) {
    // If autoplay still blocked, we'll try again on next interaction.
    audioStarted = false;
  }
}

// Hook buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (!btn) return;

  // Start music on first interaction (PLAY/BEGIN/NEXT/etc.)
  startMusicOnce();

  const next = btn.getAttribute("data-go");
  show(next);
});

// Optional: cut music before Zoom
function cutMusic() {
  const fadeDuration = 1000; // 1 second
  const fadeInterval = 50;   // how often volume lowers (ms)
  const steps = fadeDuration / fadeInterval;
  const volumeStep = audio.volume / steps;

  const fadeOut = setInterval(() => {
    if (audio.volume > volumeStep) {
      audio.volume -= volumeStep;
    } else {
      clearInterval(fadeOut);
      audio.volume = 0;
      audio.pause();
    }
  }, fadeInterval);
}


// Expose for ENTER button inline call if you want
window.cutMusic = cutMusic;

// Default start page
show("p1");
