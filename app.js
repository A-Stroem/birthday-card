/**
 * Birthday Card Application
 *
 * Main application logic for the birthday card.
 * Handles config validation, theme application, DOM population, and animations.
 */

"use strict";

const MILESTONE_AGE = 25;
const DEFAULT_BIRTHDAY_MESSAGE =
  "Wishing you a day filled with joy, laughter, and celebration!";
const DEFAULT_INSIDE_NOTE =
  "Håber du får en fantastisk dag og et vidunderligt år med masser af gode film og hygge!";
let confettiManagerInstance = null;

// ========================================
// UTILITIES
// ========================================

function isValidHttpUrl(value) {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_error) {
    return false;
  }
}

function getInitials(name) {
  if (typeof name !== "string") return "BD";
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return initials || "BD";
}

function getConfiguredBirthdayMessage() {
  if (typeof birthdayConfig?.message === "string" && birthdayConfig.message.trim()) {
    return birthdayConfig.message.trim();
  }

  return DEFAULT_BIRTHDAY_MESSAGE;
}

function getConfiguredInsideNote() {
  if (typeof birthdayConfig?.insideNote === "string" && birthdayConfig.insideNote.trim()) {
    return birthdayConfig.insideNote.trim();
  }

  return DEFAULT_INSIDE_NOTE;
}

// ========================================
// CONFIGURATION VALIDATION
// ========================================

/**
 * Validates the birthday configuration
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateConfig() {
  const errors = [];

  if (typeof birthdayConfig === "undefined") {
    errors.push("Configuration not found. Ensure config.js is loaded before app.js.");
    return { valid: false, errors };
  }

  if (
    typeof birthdayConfig.name !== "string" ||
    birthdayConfig.name.trim().length === 0
  ) {
    errors.push("Name is required in config.js and must be a non-empty string.");
  }

  if (
    typeof birthdayConfig.age !== "number" ||
    !Number.isFinite(birthdayConfig.age) ||
    birthdayConfig.age <= 0
  ) {
    errors.push("Age is required in config.js and must be a positive number.");
  }

  const photoSource = birthdayConfig.photo?.source;
  if (typeof photoSource !== "string" || photoSource.trim().length === 0) {
    errors.push("Photo source is required in config.js (photo.source).");
  } else {
    const normalizedSource = photoSource.trim();
    const isHttp = isValidHttpUrl(normalizedSource);
    if (!isHttp && normalizedSource.includes("..")) {
      errors.push("Photo source cannot include '..' path traversal segments.");
    }
  }

  if (birthdayConfig.message && typeof birthdayConfig.message !== "string") {
    errors.push("Message must be a string when provided.");
  }

  if (birthdayConfig.insideNote && typeof birthdayConfig.insideNote !== "string") {
    errors.push("insideNote must be a string when provided.");
  }

  if (birthdayConfig.audio?.enabled) {
    if (
      typeof birthdayConfig.audio.source !== "string" ||
      birthdayConfig.audio.source.trim().length === 0
    ) {
      errors.push("Audio is enabled but audio.source is missing.");
    }

    if (
      "autoPlayOnOpen" in birthdayConfig.audio &&
      typeof birthdayConfig.audio.autoPlayOnOpen !== "boolean"
    ) {
      errors.push("audio.autoPlayOnOpen must be a boolean when provided.");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Displays validation errors to the user
 * @param {string[]} errors
 */
function showConfigErrors(errors) {
  const errorDisplay = document.getElementById("errorDisplay");
  if (!errorDisplay) return;

  errorDisplay.replaceChildren();

  const title = document.createElement("h3");
  title.textContent = "Configuration Error";
  errorDisplay.appendChild(title);

  const intro = document.createElement("p");
  intro.textContent = "Please fix the following issues in config.js:";
  errorDisplay.appendChild(intro);

  const list = document.createElement("ul");
  list.style.marginTop = "0.5rem";
  list.style.paddingLeft = "1.5rem";

  errors.forEach((error) => {
    const item = document.createElement("li");
    item.textContent = error;
    list.appendChild(item);
  });

  errorDisplay.appendChild(list);
  errorDisplay.classList.add("show");
}

function hideConfigErrors() {
  const errorDisplay = document.getElementById("errorDisplay");
  if (!errorDisplay) return;
  errorDisplay.classList.remove("show");
  errorDisplay.replaceChildren();
}

// ========================================
// THEME APPLICATION
// ========================================

/**
 * Applies theme colors, fonts, and durations to CSS variables
 */
function applyTheme() {
  if (typeof theme === "undefined") {
    console.warn("Theme not found, using default CSS variables.");
    return;
  }

  const root = document.documentElement;
  const colorVarMap = {
    primary: "--color-primary",
    secondary: "--color-secondary",
    accent: "--color-accent",
    background: "--color-background",
    text: "--color-text",
    textLight: "--color-text-light",
    error: "--color-error",
  };

  Object.entries(colorVarMap).forEach(([key, cssVar]) => {
    const value = theme.colors?.[key];
    if (typeof value === "string" && value.trim()) {
      root.style.setProperty(cssVar, value.trim());
    }
  });

  if (typeof theme.fonts?.heading === "string" && theme.fonts.heading.trim()) {
    root.style.setProperty("--font-heading", theme.fonts.heading.trim());
  }

  if (typeof theme.fonts?.body === "string" && theme.fonts.body.trim()) {
    root.style.setProperty("--font-body", theme.fonts.body.trim());
  }

  const duration = theme.animations?.duration;
  if (duration && typeof duration === "object") {
    Object.entries(duration).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim()) {
        root.style.setProperty(`--duration-${key}`, value.trim());
      }
    });
  }
}

// ========================================
// DOM POPULATION
// ========================================

/**
 * Populates the DOM with birthday content
 */
function populateContent() {
  const nameEl = document.getElementById("name");
  const ageEl = document.getElementById("age");
  const badgeEl = document.getElementById("milestoneBadge");
  const messageEl = document.getElementById("message");
  const greetingEl = document.getElementById("norwegianGreeting");
  const coverNameEl = document.getElementById("coverName");
  const insideNoteEl = document.getElementById("insideNote");
  const baseMessage = getConfiguredBirthdayMessage();
  const insideNote = getConfiguredInsideNote();

  if (nameEl) {
    nameEl.textContent = birthdayConfig.name.trim();
  }

  if (coverNameEl) {
    coverNameEl.textContent = `For ${birthdayConfig.name.trim()}`;
  }

  if (ageEl) {
    ageEl.textContent = String(Math.round(birthdayConfig.age));
  }

  if (badgeEl) {
    if (birthdayConfig.age === MILESTONE_AGE) {
      badgeEl.textContent = "Quarter Century!";
      badgeEl.classList.add("show");
    } else {
      badgeEl.textContent = "";
      badgeEl.classList.remove("show");
    }
  }

  if (messageEl) {
    messageEl.textContent = baseMessage;
  }

  if (insideNoteEl) {
    insideNoteEl.textContent = insideNote;
  }

  if (greetingEl) {
    const hasNorwegianGreeting = Boolean(
      birthdayConfig.norwegianTouch?.enabled,
    );
    if (hasNorwegianGreeting) {
      const greeting =
        typeof birthdayConfig.norwegianTouch.greeting === "string" &&
        birthdayConfig.norwegianTouch.greeting.trim()
          ? birthdayConfig.norwegianTouch.greeting.trim()
          : "Gratulerer med dagen!";

      greetingEl.textContent = greeting;
      greetingEl.classList.add("show");
    } else {
      greetingEl.textContent = "";
      greetingEl.classList.remove("show");
    }
  }
}

// ========================================
// PHOTO LOADING
// ========================================

/**
 * Loads and displays photo with skeleton and fallback initials
 */
function loadPhoto() {
  const photoEl = document.getElementById("photo");
  const skeletonEl = document.getElementById("photoSkeleton");
  const errorEl = document.getElementById("photoError");
  const photoSource = birthdayConfig.photo?.source?.trim();

  if (!photoEl || !photoSource) {
    console.error("Photo element or source missing.");
    return;
  }

  photoEl.alt = birthdayConfig.photo.alt?.trim() || `${birthdayConfig.name}'s photo`;
  photoEl.classList.remove("hidden", "loaded");

  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.remove("show");
  }

  if (skeletonEl) {
    skeletonEl.classList.add("show");
  }

  const img = new Image();
  img.decoding = "async";
  img.onload = () => {
    photoEl.src = photoSource;
    photoEl.classList.add("loaded");
    if (skeletonEl) skeletonEl.classList.remove("show");
  };

  img.onerror = () => {
    photoEl.classList.add("hidden");
    if (skeletonEl) skeletonEl.classList.remove("show");

    if (errorEl) {
      errorEl.textContent = getInitials(birthdayConfig.name);
      errorEl.classList.add("show");
    }
    console.error(`Failed to load photo: ${photoSource}`);
  };

  img.src = photoSource;
}

// ========================================
// AUDIO PLAYER
// ========================================

/**
 * Sets up the optional audio player
 */
function setupAudio() {
  const audioPlayerEl = document.getElementById("audioPlayer");
  const audioButtonEl = document.getElementById("audioButton");
  const audioLabelEl = document.getElementById("audioLabel");
  const audioConfig = birthdayConfig.audio;
  const noopController = {
    attemptAutoplayOnOpen() {},
  };

  if (!audioPlayerEl || !audioButtonEl || !audioLabelEl) {
    return noopController;
  }

  audioPlayerEl.classList.remove("show");
  audioButtonEl.classList.remove("playing");
  audioButtonEl.disabled = false;

  if (!audioConfig?.enabled) {
    return noopController;
  }

  const source =
    typeof audioConfig.source === "string" ? audioConfig.source.trim() : "";
  if (!source) {
    console.warn("Audio enabled but no source provided.");
    return noopController;
  }

  const defaultLabel =
    typeof audioConfig.label === "string" && audioConfig.label.trim()
      ? audioConfig.label.trim()
      : "Play Birthday Song";
  const autoPlayOnOpen = audioConfig.autoPlayOnOpen !== false;
  audioLabelEl.textContent = defaultLabel;
  audioPlayerEl.classList.add("show");

  const audio = new Audio(source);
  audio.preload = "metadata";

  const resetButtonState = () => {
    audioButtonEl.classList.remove("playing");
    audioButtonEl.setAttribute("aria-pressed", "false");
    audioLabelEl.textContent = defaultLabel;
  };

  const startPlayback = () =>
    audio.play().then(() => {
      audioButtonEl.classList.add("playing");
      audioButtonEl.setAttribute("aria-pressed", "true");
      audioLabelEl.textContent = "Enjoying the song...";
      return true;
    });

  audio.addEventListener("ended", resetButtonState);
  audio.addEventListener("error", () => {
    audioPlayerEl.classList.remove("show");
    console.error(`Failed to load audio: ${source}`);
  });

  audioButtonEl.addEventListener("click", () => {
    if (audio.paused) {
      startPlayback().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      return;
    }

    audio.pause();
    resetButtonState();
  });

  return {
    attemptAutoplayOnOpen() {
      if (!autoPlayOnOpen || !audio.paused) {
        return;
      }

      startPlayback().catch((error) => {
        // Browser policy may block autoplay; button remains available for manual play.
        console.warn("Autoplay on card open was blocked, waiting for manual play.", error);
        resetButtonState();
      });
    },
  };
}

// ========================================
// CARD INTERACTIONS
// ========================================

function setupCardInteraction(audioController) {
  const cardBookEl = document.getElementById("cardBook");
  const cardCoverEl = document.getElementById("cardCover");
  const cardToggleButtonEl = document.getElementById("cardToggleButton");

  if (!cardBookEl || !cardCoverEl || !cardToggleButtonEl) {
    return;
  }

  let isCardOpen = false;

  const setCardState = (isOpen) => {
    const wasOpen = isCardOpen;
    isCardOpen = isOpen;
    cardCoverEl.style.transitionDuration = isOpen ? "7000ms" : "1300ms";
    cardBookEl.classList.toggle("is-open", isOpen);
    cardToggleButtonEl.textContent = isOpen ? "Close Card" : "Open Card";
    cardToggleButtonEl.setAttribute("aria-expanded", String(isOpen));
    cardCoverEl.setAttribute("aria-hidden", String(isOpen));

    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    document.body.classList.toggle("card-open-mobile", isMobileViewport && isOpen);

    if (!wasOpen && isOpen && audioController) {
      audioController.attemptAutoplayOnOpen();
    }
  };

  cardCoverEl.addEventListener("click", () => {
    setCardState(true);
  });

  cardToggleButtonEl.addEventListener("click", () => {
    setCardState(!isCardOpen);
  });

  // Initialize closed state for consistent mobile viewport locking and ARIA state.
  setCardState(false);
}

// ========================================
// CONFETTI ANIMATION
// ========================================

class ConfettiParticle {
  constructor(canvas, palette) {
    this.canvas = canvas;
    this.palette = palette;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * -this.canvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 2 + 1.5;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 8 - 4;
    this.color = this.palette[Math.floor(Math.random() * this.palette.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > this.canvas.height + 24) {
      this.reset();
      this.y = -24;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

class ConfettiManager {
  constructor(canvas, intensity = "medium") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.intensity = intensity;
    this.particles = [];
    this.animationFrame = null;
    this.running = false;
    this.palette = [
      getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() ||
        "#D4AF37",
      getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() ||
        "#E8B4B8",
      "#ffffff",
      "#ffd166",
    ];

    this.handleResize = this.resizeCanvas.bind(this);
    window.addEventListener("resize", this.handleResize);
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  getParticleCount() {
    const isMobile = window.innerWidth < 768;
    switch (this.intensity) {
      case "low":
        return isMobile ? 18 : 28;
      case "high":
        return isMobile ? 45 : 80;
      default:
        return isMobile ? 30 : 50;
    }
  }

  start() {
    if (!this.ctx || this.running) return;
    this.running = true;

    const count = this.getParticleCount();
    this.particles = Array.from(
      { length: count },
      () => new ConfettiParticle(this.canvas, this.palette),
    );

    this.animate();
  }

  animate() {
    if (!this.running || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(this.ctx);
    });

    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }

  stop() {
    this.running = false;
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener("resize", this.handleResize);
  }
}

function initConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  if (theme?.animations?.enableParticles === false) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const intensity = theme?.animations?.confettiIntensity || "medium";
  confettiManagerInstance = new ConfettiManager(canvas, intensity);
  confettiManagerInstance.start();
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function setupScrollAnimations() {
  if (window.innerWidth > 1024) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const candidates = [
    document.querySelector(".message"),
    document.querySelector(".audio-player.show"),
  ].filter(Boolean);

  if (!("IntersectionObserver" in window) || candidates.length === 0) {
    candidates.forEach((element) => element.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  candidates.forEach((element) => {
    element.classList.add("scroll-reveal");
    observer.observe(element);
  });
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
  hideConfigErrors();

  const validation = validateConfig();
  if (!validation.valid) {
    console.error("Configuration validation failed:", validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  applyTheme();
  populateContent();
  loadPhoto();
  const audioController = setupAudio();
  setupCardInteraction(audioController);
  initConfetti();
  setupScrollAnimations();

  console.log("Birthday Card initialized.");
}

document.addEventListener("visibilitychange", () => {
  if (!confettiManagerInstance) return;

  if (document.hidden) {
    confettiManagerInstance.stop();
  } else {
    confettiManagerInstance.start();
  }
});

window.addEventListener("beforeunload", () => {
  if (confettiManagerInstance) {
    confettiManagerInstance.destroy();
    confettiManagerInstance = null;
  }
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
