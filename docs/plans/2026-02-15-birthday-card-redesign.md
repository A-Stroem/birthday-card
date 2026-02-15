# Birthday Card Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a reusable, config-driven birthday card with enhanced animations, modern design, Norwegian influences, and 25th milestone celebration.

**Architecture:** Vanilla JavaScript with modular file structure. Config and theme separated from logic. CSS variables enable future theme system. Mobile-first responsive design with performance optimizations.

**Tech Stack:** HTML5, CSS3 (Grid, Flexbox, Variables, Animations), Vanilla JavaScript (ES6+), no build tools or frameworks.

---

## Task 1: Project Setup & File Structure

**Files:**
- Create: `config.js`
- Create: `theme.js`
- Create: `app.js`
- Backup: `index.html` → `index.html.backup`
- Backup: `styles.css` → `styles.css.backup`
- Backup: `scripts.js` → `scripts.js.backup`

**Step 1: Backup existing files**

```bash
cp index.html index.html.backup
cp styles.css styles.css.backup
cp scripts.js scripts.js.backup
```

**Step 2: Create config.js with example data**

Create: `config.js`

```javascript
/**
 * Birthday Card Configuration
 *
 * Edit this file to customize the birthday card for different people.
 * Required fields: name, age, photo.source
 * Optional fields: message, audio, norwegianTouch
 */

const birthdayConfig = {
  // Required: Person's name
  name: "Emma",

  // Required: Person's age
  age: 25,

  // Required: Photo configuration
  photo: {
    source: "assets/emma.jpg",  // Can be local path or URL
    alt: "Emma's photo"
  },

  // Optional: Birthday message
  message: "Happy 25th Birthday! Here's to an amazing year ahead filled with joy, adventure, and all the things that make you smile!",

  // Optional: Audio configuration
  audio: {
    enabled: true,
    source: "assets/Tommy Seebach - Hip hurra, det' min fødselsdag (Official Audio).mp3",
    label: "Play Birthday Song"
  },

  // Optional: Norwegian touches
  norwegianTouch: {
    enabled: true,
    greeting: "Gratulerer med dagen!"  // Norwegian "Happy Birthday"
  }
};
```

**Step 3: Create theme.js with default theme**

Create: `theme.js`

```javascript
/**
 * Theme Configuration
 *
 * Defines visual styling for the birthday card.
 * Future: Can create multiple theme files (theme-playful.js, theme-minimal.js)
 */

const theme = {
  name: "elegant-birthday",

  colors: {
    primary: "#D4AF37",      // Gold - milestone celebration
    secondary: "#2C3E50",    // Deep blue-grey
    accent: "#E8B4B8",       // Soft pink
    background: "#FEFEFE",   // Off-white
    text: "#1A1A1A",         // Almost black
    textLight: "#6B7280",    // Grey for secondary text
    error: "#DC2626"         // Red for errors
  },

  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif"
  },

  animations: {
    confettiIntensity: "medium",  // low, medium, high
    enableParticles: true,
    duration: {
      fast: "0.2s",
      normal: "0.4s",
      slow: "0.8s"
    }
  }
};
```

**Step 4: Create empty app.js**

Create: `app.js`

```javascript
/**
 * Birthday Card Application
 *
 * Main application logic for the birthday card.
 * Handles config validation, theme application, DOM population, and animations.
 */

// Application will be implemented in subsequent tasks
console.log('Birthday Card App Loading...');
```

**Step 5: Verify files created**

```bash
ls -la *.js
```

Expected output: config.js, theme.js, app.js, scripts.js, scripts.js.backup

---

## Task 2: HTML Structure - Base Setup

**Files:**
- Modify: `index.html` (complete rewrite)

**Step 1: Create new HTML structure with proper meta tags**

Replace entire contents of `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Birthday celebration card">
  <title>Happy Birthday!</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Main Container -->
  <main class="birthday-card">

    <!-- Hero Section -->
    <section class="hero" id="hero">
      <!-- Norwegian Greeting (conditionally shown) -->
      <div class="norwegian-greeting" id="norwegianGreeting"></div>

      <!-- Name Display -->
      <h1 class="name" id="name"></h1>

      <!-- Age with 25th Milestone Badge -->
      <div class="age-container">
        <div class="age" id="age"></div>
        <div class="milestone-badge" id="milestoneBadge"></div>
      </div>

      <!-- Photo -->
      <div class="photo-container">
        <div class="photo-frame">
          <img id="photo" class="photo" alt="" />
          <div class="photo-skeleton" id="photoSkeleton"></div>
          <div class="photo-error" id="photoError"></div>
        </div>
      </div>

      <!-- Birthday Message -->
      <p class="message" id="message"></p>

      <!-- Audio Player (conditionally shown) -->
      <div class="audio-player" id="audioPlayer">
        <button class="audio-button" id="audioButton">
          <span class="audio-icon">♫</span>
          <span class="audio-label" id="audioLabel"></span>
        </button>
      </div>
    </section>

    <!-- Confetti Canvas -->
    <canvas class="confetti-canvas" id="confettiCanvas"></canvas>

    <!-- Error Display -->
    <div class="error-display" id="errorDisplay"></div>

  </main>

  <!-- Scripts -->
  <script src="config.js"></script>
  <script src="theme.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

**Step 2: Test HTML loads**

Open in browser:
```bash
open index.html
```

Expected: Blank page (no errors in console), fonts should load

**Step 3: Verify script loading order**

Open browser console and check for:
- "Birthday Card App Loading..." message
- No errors

---

## Task 3: CSS - Base Styles & Variables

**Files:**
- Modify: `styles.css` (complete rewrite)

**Step 1: Create CSS reset and base styles**

Replace entire contents of `styles.css`:

```css
/**
 * Birthday Card Styles
 * Mobile-first responsive design with CSS variables for theming
 */

/* ========================================
   CSS RESET & BASE
   ======================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Theme colors - will be set dynamically by JavaScript */
  --color-primary: #D4AF37;
  --color-secondary: #2C3E50;
  --color-accent: #E8B4B8;
  --color-background: #FEFEFE;
  --color-text: #1A1A1A;
  --color-text-light: #6B7280;
  --color-error: #DC2626;

  /* Fonts - will be set dynamically */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  /* Animation durations */
  --duration-fast: 0.2s;
  --duration-normal: 0.4s;
  --duration-slow: 0.8s;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;

  /* Border radius */
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 2rem;
  --radius-full: 9999px;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-background);
  line-height: 1.6;
  overflow-x: hidden;
}

/* ========================================
   MAIN CONTAINER
   ======================================== */

.birthday-card {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  position: relative;
}

/* ========================================
   HERO SECTION
   ======================================== */

.hero {
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;
  animation: fadeIn var(--duration-slow) ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========================================
   TYPOGRAPHY
   ======================================== */

.norwegian-greeting {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--color-secondary);
  margin-bottom: var(--spacing-sm);
  opacity: 0.8;
  animation: fadeIn var(--duration-slow) ease-out 0.2s backwards;
}

.name {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-sm);
  animation: fadeIn var(--duration-slow) ease-out 0.3s backwards;
}

.age-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  animation: fadeIn var(--duration-slow) ease-out 0.4s backwards;
}

.age {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 600;
  color: var(--color-primary);
}

.milestone-badge {
  display: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border-radius: var(--radius-full);
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.milestone-badge.show {
  display: inline-block;
}

.message {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn var(--duration-slow) ease-out 0.8s backwards;
}

/* ========================================
   PHOTO
   ======================================== */

.photo-container {
  margin: var(--spacing-xl) auto;
  animation: fadeIn var(--duration-slow) ease-out 0.5s backwards;
}

.photo-frame {
  width: clamp(200px, 50vw, 300px);
  height: clamp(200px, 50vw, 300px);
  margin: 0 auto;
  position: relative;
  border-radius: var(--radius-full);
  overflow: hidden;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 0 0 8px var(--color-background),
    0 0 0 10px var(--color-primary);
  transition: transform var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
}

.photo-frame:hover {
  transform: scale(1.05);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 8px var(--color-background),
    0 0 0 10px var(--color-primary);
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-background) 25%,
    #f0f0f0 50%,
    var(--color-background) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.photo-error {
  display: none;
  position: absolute;
  inset: 0;
  background-color: var(--color-accent);
  color: white;
  font-size: clamp(3rem, 15vw, 6rem);
  font-weight: 600;
  align-items: center;
  justify-content: center;
}

.photo-error.show {
  display: flex;
}

/* ========================================
   AUDIO PLAYER
   ======================================== */

.audio-player {
  display: none;
  margin-top: var(--spacing-lg);
  animation: fadeIn var(--duration-slow) ease-out 0.9s backwards;
}

.audio-player.show {
  display: block;
}

.audio-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.audio-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.audio-button:active {
  transform: translateY(0);
}

.audio-button.playing .audio-icon {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* ========================================
   CONFETTI CANVAS
   ======================================== */

.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

/* ========================================
   ERROR DISPLAY
   ======================================== */

.error-display {
  display: none;
  position: fixed;
  top: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  width: calc(100% - var(--spacing-md) * 2);
  padding: var(--spacing-md);
  background-color: var(--color-error);
  color: white;
  border-radius: var(--radius-md);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideDown var(--duration-normal) ease-out;
}

.error-display.show {
  display: block;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.error-display h3 {
  margin-bottom: var(--spacing-xs);
  font-size: 1.125rem;
}

.error-display p {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* ========================================
   RESPONSIVE - TABLET
   ======================================== */

@media (min-width: 768px) {
  .birthday-card {
    padding: var(--spacing-xl);
  }

  .hero {
    max-width: 700px;
  }
}

/* ========================================
   RESPONSIVE - DESKTOP
   ======================================== */

@media (min-width: 1024px) {
  .birthday-card {
    padding: var(--spacing-2xl);
  }

  .hero {
    max-width: 800px;
  }
}

/* ========================================
   ACCESSIBILITY
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles for keyboard navigation */
button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}
```

**Step 2: Test styles load**

Refresh browser and verify:
- Page has white background
- No console errors
- Fonts load (check Network tab)

---

## Task 4: App.js - Configuration Validation

**Files:**
- Modify: `app.js`

**Step 1: Add config validation functions**

Replace contents of `app.js`:

```javascript
/**
 * Birthday Card Application
 */

// ========================================
// CONFIGURATION VALIDATION
// ========================================

/**
 * Validates the birthday configuration
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateConfig() {
  const errors = [];

  // Check if config exists
  if (typeof birthdayConfig === 'undefined') {
    errors.push('Configuration not found. Please ensure config.js is loaded.');
    return { valid: false, errors };
  }

  // Required: name
  if (!birthdayConfig.name || typeof birthdayConfig.name !== 'string' || birthdayConfig.name.trim() === '') {
    errors.push('Name is required in config.js');
  }

  // Required: age
  if (!birthdayConfig.age || typeof birthdayConfig.age !== 'number' || birthdayConfig.age <= 0) {
    errors.push('Valid age is required in config.js');
  }

  // Required: photo.source
  if (!birthdayConfig.photo || !birthdayConfig.photo.source) {
    errors.push('Photo source is required in config.js (photo.source)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Displays validation errors to the user
 * @param {string[]} errors - Array of error messages
 */
function showConfigErrors(errors) {
  const errorDisplay = document.getElementById('errorDisplay');
  if (!errorDisplay) return;

  const errorHtml = `
    <h3>Configuration Error</h3>
    <p>Please fix the following issues in config.js:</p>
    <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
      ${errors.map(err => `<li>${err}</li>`).join('')}
    </ul>
  `;

  errorDisplay.innerHTML = errorHtml;
  errorDisplay.classList.add('show');
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the birthday card application
 */
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');
  console.log('Config:', birthdayConfig);
  console.log('Theme:', theme);
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

**Step 2: Test validation with valid config**

Refresh browser and check console:
- Should see "Initializing Birthday Card..."
- Should see "Configuration valid!"
- Should see config and theme objects logged

**Step 3: Test validation with invalid config**

Temporarily edit `config.js` - comment out the name:
```javascript
// name: "Emma",
```

Refresh browser and verify:
- Error message appears at top of page: "Name is required in config.js"
- Console shows error

**Step 4: Restore valid config**

Uncomment the name in `config.js` and verify error disappears.

---

## Task 5: App.js - Theme Application

**Files:**
- Modify: `app.js`

**Step 1: Add theme application functions**

Add after the validation functions, before initialization:

```javascript
// ========================================
// THEME APPLICATION
// ========================================

/**
 * Applies theme colors and fonts to CSS variables
 */
function applyTheme() {
  if (typeof theme === 'undefined') {
    console.warn('Theme not found, using default styles');
    return;
  }

  const root = document.documentElement;

  // Apply colors
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  }

  // Apply fonts
  if (theme.fonts) {
    if (theme.fonts.heading) {
      root.style.setProperty('--font-heading', theme.fonts.heading);
    }
    if (theme.fonts.body) {
      root.style.setProperty('--font-body', theme.fonts.body);
    }
  }

  // Apply animation durations
  if (theme.animations && theme.animations.duration) {
    Object.entries(theme.animations.duration).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, value);
    });
  }

  console.log('Theme applied:', theme.name);
}
```

**Step 2: Call applyTheme in init function**

Update the `init()` function to call `applyTheme()` after validation:

```javascript
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');

  // Apply theme
  applyTheme();

  console.log('Config:', birthdayConfig);
  console.log('Theme:', theme);
}
```

**Step 3: Test theme application**

Refresh browser and:
1. Open DevTools → Elements → html element
2. Check that CSS variables are set with theme colors
3. Console should show "Theme applied: elegant-birthday"

**Step 4: Test theme color change**

Edit `theme.js` - change primary color to red:
```javascript
primary: "#FF0000",
```

Refresh and verify CSS variable `--color-primary` is now red in DevTools.

**Step 5: Restore original theme color**

Change primary back to gold:
```javascript
primary: "#D4AF37",
```

---

## Task 6: App.js - DOM Population (Name, Age, Message)

**Files:**
- Modify: `app.js`

**Step 1: Add DOM population functions**

Add before initialization section:

```javascript
// ========================================
// DOM POPULATION
// ========================================

/**
 * Populates the DOM with birthday person's information
 */
function populateContent() {
  // Name
  const nameEl = document.getElementById('name');
  if (nameEl) {
    nameEl.textContent = birthdayConfig.name;
  }

  // Age
  const ageEl = document.getElementById('age');
  if (ageEl) {
    ageEl.textContent = `${birthdayConfig.age}`;
  }

  // 25th Milestone Badge
  if (birthdayConfig.age === 25) {
    const badgeEl = document.getElementById('milestoneBadge');
    if (badgeEl) {
      badgeEl.textContent = 'Quarter Century!';
      badgeEl.classList.add('show');
    }
  }

  // Message
  const messageEl = document.getElementById('message');
  if (messageEl && birthdayConfig.message) {
    messageEl.textContent = birthdayConfig.message;
  }

  // Norwegian Greeting
  const greetingEl = document.getElementById('norwegianGreeting');
  if (greetingEl && birthdayConfig.norwegianTouch && birthdayConfig.norwegianTouch.enabled) {
    greetingEl.textContent = birthdayConfig.norwegianTouch.greeting || 'Gratulerer med dagen!';
  }

  console.log('Content populated');
}
```

**Step 2: Call populateContent in init**

Update `init()` to call `populateContent()`:

```javascript
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');

  // Apply theme
  applyTheme();

  // Populate content
  populateContent();

  console.log('Initialization complete!');
}
```

**Step 3: Test content population**

Refresh browser and verify:
- Name "Emma" appears in large text
- Age "25" appears in gold color
- "Quarter Century!" badge appears next to age
- Birthday message appears below photo area
- Norwegian greeting "Gratulerer med dagen!" appears at top
- Console shows "Content populated"

**Step 4: Test with different age**

Edit `config.js` - change age to 30:
```javascript
age: 30,
```

Refresh and verify:
- Age shows "30"
- Quarter Century badge does NOT appear

**Step 5: Restore age to 25**

```javascript
age: 25,
```

---

## Task 7: App.js - Photo Loading with Error Handling

**Files:**
- Modify: `app.js`

**Step 1: Add photo loading functions**

Add to DOM POPULATION section:

```javascript
/**
 * Loads and displays the birthday person's photo
 */
function loadPhoto() {
  const photoEl = document.getElementById('photo');
  const skeletonEl = document.getElementById('photoSkeleton');
  const errorEl = document.getElementById('photoError');

  if (!photoEl || !birthdayConfig.photo || !birthdayConfig.photo.source) {
    console.error('Photo configuration missing');
    return;
  }

  // Set alt text
  photoEl.alt = birthdayConfig.photo.alt || `${birthdayConfig.name}'s photo`;

  // Show skeleton while loading
  if (skeletonEl) {
    skeletonEl.style.display = 'block';
  }

  // Load image
  const img = new Image();

  img.onload = function() {
    photoEl.src = birthdayConfig.photo.source;
    if (skeletonEl) {
      skeletonEl.style.display = 'none';
    }
    console.log('Photo loaded successfully');
  };

  img.onerror = function() {
    console.error('Failed to load photo:', birthdayConfig.photo.source);

    // Hide photo and skeleton
    photoEl.style.display = 'none';
    if (skeletonEl) {
      skeletonEl.style.display = 'none';
    }

    // Show error placeholder with initials
    if (errorEl) {
      const initials = birthdayConfig.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      errorEl.textContent = initials;
      errorEl.classList.add('show');
    }
  };

  img.src = birthdayConfig.photo.source;
}
```

**Step 2: Call loadPhoto in init**

Update `init()`:

```javascript
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');

  // Apply theme
  applyTheme();

  // Populate content
  populateContent();

  // Load photo
  loadPhoto();

  console.log('Initialization complete!');
}
```

**Step 3: Test with valid photo (URL)**

Edit `config.js` to use a test URL:
```javascript
photo: {
  source: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  alt: "Test photo"
},
```

Refresh and verify:
- Skeleton shows briefly
- Photo loads and displays
- Console shows "Photo loaded successfully"

**Step 4: Test with invalid photo**

Edit `config.js` with broken URL:
```javascript
photo: {
  source: "https://invalid-url-that-will-fail.com/photo.jpg",
  alt: "Test photo"
},
```

Refresh and verify:
- Skeleton shows briefly
- Error placeholder appears with initials "EM"
- Console shows error message

**Step 5: Test with local file**

Create or copy a photo to assets folder, then update config:
```javascript
photo: {
  source: "Assets/rikke.jpg",  // Use existing photo from backup
  alt: "Emma's photo"
},
```

Refresh and verify photo loads from local file.

---

## Task 8: App.js - Audio Player

**Files:**
- Modify: `app.js`

**Step 1: Add audio player setup**

Add after photo loading functions:

```javascript
/**
 * Sets up the audio player
 */
function setupAudio() {
  const audioPlayerEl = document.getElementById('audioPlayer');
  const audioButtonEl = document.getElementById('audioButton');
  const audioLabelEl = document.getElementById('audioLabel');

  // Check if audio is enabled
  if (!birthdayConfig.audio || !birthdayConfig.audio.enabled) {
    console.log('Audio disabled in config');
    return;
  }

  // Check if audio source exists
  if (!birthdayConfig.audio.source) {
    console.warn('Audio enabled but no source provided');
    return;
  }

  // Show audio player
  if (audioPlayerEl) {
    audioPlayerEl.classList.add('show');
  }

  // Set button label
  if (audioLabelEl) {
    audioLabelEl.textContent = birthdayConfig.audio.label || 'Play Birthday Song';
  }

  // Create audio element
  const audio = new Audio();
  audio.src = birthdayConfig.audio.source;
  audio.preload = 'metadata';

  // Handle audio errors
  audio.onerror = function() {
    console.error('Failed to load audio:', birthdayConfig.audio.source);
    if (audioPlayerEl) {
      audioPlayerEl.style.display = 'none';
    }
  };

  // Button click handler
  if (audioButtonEl) {
    audioButtonEl.addEventListener('click', function() {
      if (audio.paused) {
        audio.play().then(() => {
          audioButtonEl.classList.add('playing');
          if (audioLabelEl) {
            audioLabelEl.textContent = 'Enjoying the song...';
          }
          console.log('Audio playing');
        }).catch(err => {
          console.error('Failed to play audio:', err);
        });
      } else {
        audio.pause();
        audioButtonEl.classList.remove('playing');
        if (audioLabelEl) {
          audioLabelEl.textContent = birthdayConfig.audio.label || 'Play Birthday Song';
        }
      }
    });

    // Reset when audio ends
    audio.addEventListener('ended', function() {
      audioButtonEl.classList.remove('playing');
      if (audioLabelEl) {
        audioLabelEl.textContent = birthdayConfig.audio.label || 'Play Birthday Song';
      }
    });
  }

  console.log('Audio player setup complete');
}
```

**Step 2: Call setupAudio in init**

Update `init()`:

```javascript
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');

  // Apply theme
  applyTheme();

  // Populate content
  populateContent();

  // Load photo
  loadPhoto();

  // Setup audio
  setupAudio();

  console.log('Initialization complete!');
}
```

**Step 3: Test audio player appears**

Refresh browser and verify:
- Audio button appears below message
- Button shows "Play Birthday Song"
- Console shows "Audio player setup complete"

**Step 4: Test audio playback**

Click the audio button and verify:
- Audio plays (use existing Tommy Seebach file)
- Button shows "Enjoying the song..."
- Musical note icon pulses
- When song ends, button resets

**Step 5: Test with audio disabled**

Edit `config.js`:
```javascript
audio: {
  enabled: false,
  // ...
},
```

Refresh and verify:
- Audio button does NOT appear
- Console shows "Audio disabled in config"

**Step 6: Re-enable audio**

```javascript
audio: {
  enabled: true,
  // ...
},
```

---

## Task 9: App.js - Confetti Animation System

**Files:**
- Modify: `app.js`

**Step 1: Add confetti animation functions**

Add after audio setup:

```javascript
// ========================================
// CONFETTI ANIMATION
// ========================================

/**
 * Creates a confetti particle
 */
class ConfettiParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.color = this.getRandomColor();
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  getRandomColor() {
    const colors = [
      '#D4AF37', // Gold
      '#E8B4B8', // Pink
      '#FF6B9D', // Bright pink
      '#FFA500', // Orange
      '#00D4FF', // Cyan
      '#8A2BE2'  // Purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // Reset if off screen
    if (this.y > this.canvas.height + 20) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

/**
 * Confetti animation manager
 */
class ConfettiManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationFrame = null;
    this.isRunning = false;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start(intensity = 'medium') {
    if (this.isRunning) return;

    // Determine particle count based on intensity and screen size
    const isMobile = window.innerWidth < 768;
    let particleCount;

    switch(intensity) {
      case 'low':
        particleCount = isMobile ? 20 : 30;
        break;
      case 'high':
        particleCount = isMobile ? 60 : 100;
        break;
      case 'medium':
      default:
        particleCount = isMobile ? 40 : 60;
    }

    // Create particles
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new ConfettiParticle(this.canvas));
    }

    this.isRunning = true;
    this.animate();
    console.log(`Confetti started with ${particleCount} particles (${intensity} intensity)`);
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.update();
      particle.draw(this.ctx);
    });

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

/**
 * Initializes confetti animation
 */
function initConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) {
    console.warn('Confetti canvas not found');
    return;
  }

  // Check if animations are enabled
  if (theme.animations && theme.animations.enableParticles === false) {
    console.log('Confetti disabled in theme');
    return;
  }

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('Confetti disabled - user prefers reduced motion');
    return;
  }

  const intensity = theme.animations?.confettiIntensity || 'medium';
  const confettiManager = new ConfettiManager(canvas);
  confettiManager.start(intensity);
}
```

**Step 2: Call initConfetti in init**

Update `init()`:

```javascript
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');

  // Apply theme
  applyTheme();

  // Populate content
  populateContent();

  // Load photo
  loadPhoto();

  // Setup audio
  setupAudio();

  // Initialize confetti
  initConfetti();

  console.log('Initialization complete!');
}
```

**Step 3: Test confetti animation**

Refresh browser and verify:
- Colorful confetti particles fall continuously
- Particles rotate and drift
- Console shows particle count
- Animation is smooth

**Step 4: Test different intensities**

Edit `theme.js` - try different intensities:

Low:
```javascript
confettiIntensity: "low",
```

High:
```javascript
confettiIntensity: "high",
```

Verify particle counts change.

**Step 5: Test mobile performance**

Resize browser to mobile width (<768px) and verify fewer particles are used.

**Step 6: Restore medium intensity**

```javascript
confettiIntensity: "medium",
```

---

## Task 10: CSS - Hover Effects & Additional Animations

**Files:**
- Modify: `styles.css`

**Step 1: Add message hover effect**

Add after the `.message` rule:

```css
.message {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeIn var(--duration-slow) ease-out 0.8s backwards;
  transition: text-shadow var(--duration-normal) ease;
}

.message:hover {
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}
```

**Step 2: Add scroll animations for mobile**

Add before the RESPONSIVE section:

```css
/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity var(--duration-slow) ease, transform var(--duration-slow) ease;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 3: Add Norwegian flag inspired accent**

Add after TYPOGRAPHY section:

```css
/* ========================================
   NORWEGIAN TOUCHES
   ======================================== */

.norwegian-greeting::before {
  content: '🇳🇴';
  margin-right: var(--spacing-xs);
  font-size: 1.2em;
}
```

**Step 4: Add shimmer effect for milestone badge**

Add after `.milestone-badge.show`:

```css
.milestone-badge.show {
  display: inline-block;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0%, 100% {
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
  }
}
```

**Step 5: Test hover and animation effects**

Refresh browser and verify:
- Hovering over message creates subtle gold glow
- Norwegian greeting has flag emoji
- Milestone badge has shimmer effect
- All animations are smooth

---

## Task 11: App.js - Scroll Animations (Mobile Enhancement)

**Files:**
- Modify: `app.js`

**Step 1: Add scroll animation setup**

Add after confetti section:

```javascript
// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Sets up scroll-triggered animations for mobile
 */
function setupScrollAnimations() {
  // Only enable on mobile/tablet
  if (window.innerWidth > 1024) {
    console.log('Scroll animations disabled on desktop');
    return;
  }

  const elements = document.querySelectorAll('.message, .audio-player');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  console.log('Scroll animations setup');
}
```

**Step 2: Call setupScrollAnimations in init**

Update `init()`:

```javascript
function init() {
  console.log('Initializing Birthday Card...');

  // Validate configuration
  const validation = validateConfig();
  if (!validation.valid) {
    console.error('Configuration validation failed:', validation.errors);
    showConfigErrors(validation.errors);
    return;
  }

  console.log('Configuration valid!');

  // Apply theme
  applyTheme();

  // Populate content
  populateContent();

  // Load photo
  loadPhoto();

  // Setup audio
  setupAudio();

  // Initialize confetti
  initConfetti();

  // Setup scroll animations
  setupScrollAnimations();

  console.log('Initialization complete!');
}
```

**Step 3: Test scroll animations**

Resize browser to mobile width and scroll down - verify message and audio button animate in.

---

## Task 12: Documentation - README

**Files:**
- Create: `README.md`

**Step 1: Create comprehensive README**

Create `README.md`:

```markdown
# Birthday Card

A reusable, config-driven birthday card website with modern design, enhanced animations, and Norwegian influences.

## Features

- ✨ **Config-based customization** - Edit one file to create a new birthday card
- 🎨 **Modern, elegant design** - Sophisticated yet celebratory aesthetic
- 📱 **Mobile-first responsive** - Looks great on all devices
- 🎉 **Enhanced animations** - Smooth confetti, hover effects, and transitions
- 🇳🇴 **Norwegian influences** - Optional Norwegian greeting and Nordic design touches
- 🎵 **Optional audio** - Play birthday song with elegant controls
- 🏆 **Milestone celebrations** - Special styling for 25th birthdays (easily customizable)
- 🎭 **Theme-ready architecture** - Easy to add new themes in the future

## Quick Start

### 1. Customize the Card

Edit `config.js` with the birthday person's information:

```javascript
const birthdayConfig = {
  name: "Your Friend's Name",
  age: 25,
  photo: {
    source: "assets/photo.jpg",  // or use a URL
    alt: "Photo description"
  },
  message: "Your birthday message here!",
  audio: {
    enabled: true,
    source: "assets/song.mp3",
    label: "Play Birthday Song"
  },
  norwegianTouch: {
    enabled: true,
    greeting: "Gratulerer med dagen!"
  }
};
```

### 2. Add Photo & Audio (Optional)

- Place photo in `assets/` folder OR use a URL
- Place audio file in `assets/` folder (optional)

### 3. Open the Card

**Option 1: Direct Open**
```bash
open index.html
```

**Option 2: Local Server (recommended)**
```bash
# Python
python3 -m http.server 8000

# Node
npx http-server
```

Then open `http://localhost:8000`

## Configuration Reference

### Required Fields

- `name` (string) - Birthday person's name
- `age` (number) - Birthday person's age
- `photo.source` (string) - Photo path or URL

### Optional Fields

- `message` (string) - Birthday message
- `photo.alt` (string) - Image alt text for accessibility
- `audio.enabled` (boolean) - Show/hide audio player
- `audio.source` (string) - Audio file path
- `audio.label` (string) - Button text
- `norwegianTouch.enabled` (boolean) - Show Norwegian greeting
- `norwegianTouch.greeting` (string) - Custom Norwegian text

## Customizing the Theme

Edit `theme.js` to change colors, fonts, and animations:

```javascript
const theme = {
  colors: {
    primary: "#D4AF37",    // Main accent color
    secondary: "#2C3E50",  // Headings
    accent: "#E8B4B8",     // Secondary accent
    // ...
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif"
  },
  animations: {
    confettiIntensity: "medium",  // low, medium, high
    enableParticles: true
  }
};
```

## File Structure

```
birthday-card/
├── index.html          # Main HTML structure
├── config.js           # ← Edit this for each birthday
├── theme.js            # Visual theme configuration
├── app.js              # Application logic (don't edit unless adding features)
├── styles.css          # Styles (don't edit unless customizing design)
├── assets/             # Photos and audio files
│   ├── photo.jpg
│   └── song.mp3
└── docs/
    └── plans/          # Design documentation
```

## Adding Future Themes

To add a new theme (future feature):

1. Create `theme-playful.js` based on `theme.js`
2. Change colors, fonts, animation settings
3. Add theme selector to config
4. App will load the specified theme

## Browser Support

Supports all modern browsers (last 2 years):
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Accessibility

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- Minimum 44px touch targets on mobile

## Performance

- Target page weight: < 1MB
- Mobile-optimized animations
- Lazy image loading
- Reduced confetti particles on mobile

## License

This is a personal project. Feel free to use and customize for your own birthday cards!

## Credits

Built with vanilla JavaScript, no frameworks or build tools required.
```

**Step 2: Verify README renders correctly**

View README.md in GitHub or a markdown viewer to ensure formatting is correct.

---

## Task 13: Testing & Verification

**Files:**
- All files

**Step 1: Test valid configuration**

Ensure `config.js` has all required fields and refresh browser. Verify:
- ✅ Page loads without errors
- ✅ Theme colors applied correctly
- ✅ Name displays
- ✅ Age displays with "25" in gold
- ✅ "Quarter Century!" badge appears
- ✅ Photo loads (or shows initials if failed)
- ✅ Message displays
- ✅ Norwegian greeting appears with flag
- ✅ Audio button appears and works
- ✅ Confetti animates smoothly
- ✅ Hover effects work on photo and message

**Step 2: Test invalid configuration**

Temporarily break config by removing name:
```javascript
// name: "Emma",
```

Verify:
- ✅ Error message appears at top of page
- ✅ Error is user-friendly and helpful

Restore config.

**Step 3: Test mobile responsive**

Resize browser to 375px width and verify:
- ✅ Layout is single column
- ✅ Text is readable (not too small)
- ✅ Photo scales appropriately
- ✅ Buttons are easy to tap (min 44px)
- ✅ Fewer confetti particles (better performance)
- ✅ Scroll animations work

**Step 4: Test tablet responsive**

Resize to 768px width and verify:
- ✅ Layout looks good
- ✅ Spacing is appropriate

**Step 5: Test desktop responsive**

Resize to 1440px width and verify:
- ✅ Content is centered
- ✅ Max-width constrains content nicely
- ✅ Animations are smooth

**Step 6: Test with different ages**

Try ages: 18, 25, 30, 50 and verify:
- ✅ Only age 25 shows milestone badge
- ✅ Other ages display correctly without badge

**Step 7: Test photo loading scenarios**

Test with:
1. Valid local file: ✅ Loads correctly
2. Valid URL: ✅ Loads correctly
3. Invalid URL: ✅ Shows initials placeholder
4. Missing file: ✅ Shows initials placeholder

**Step 8: Test audio scenarios**

Test with:
1. Audio enabled + valid file: ✅ Player appears, audio plays
2. Audio enabled + invalid file: ✅ Player hides gracefully
3. Audio disabled: ✅ Player doesn't appear

**Step 9: Test Norwegian greeting**

Test with:
1. norwegianTouch.enabled = true: ✅ Greeting appears with flag
2. norwegianTouch.enabled = false: ✅ Greeting doesn't appear
3. Custom greeting text: ✅ Uses custom text

**Step 10: Test accessibility**

1. Tab through page with keyboard: ✅ Focus visible, logical order
2. Test with browser zoom 200%: ✅ Content remains usable
3. Check with DevTools Lighthouse accessibility audit: ✅ Score > 90

**Step 11: Test performance**

Run Lighthouse performance audit:
- ✅ First Contentful Paint < 1.5s
- ✅ Total page weight < 1MB
- ✅ No console errors

**Step 12: Test prefers-reduced-motion**

Enable reduced motion in OS settings and verify:
- ✅ Confetti doesn't start
- ✅ Animations are minimal/instant
- ✅ Page still functional

---

## Task 14: Cleanup & Final Polish

**Files:**
- Project root

**Step 1: Remove backup files**

```bash
rm index.html.backup styles.css.backup scripts.js.backup
```

**Step 2: Clean up old assets**

Move unused Malte and Rikke photos to a backup folder:
```bash
mkdir assets/backup
mv Assets/malte.jpg assets/backup/
mv Assets/rikke.jpg assets/backup/
```

**Step 3: Update config.js with placeholder data**

Edit `config.js` to have generic placeholder data for distribution:

```javascript
const birthdayConfig = {
  name: "Your Friend",
  age: 25,
  photo: {
    source: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    alt: "Birthday person"
  },
  message: "Wishing you a wonderful birthday filled with joy, laughter, and unforgettable moments!",
  audio: {
    enabled: false,  // Set to true and add audio file
    source: "assets/birthday-song.mp3",
    label: "Play Birthday Song"
  },
  norwegianTouch: {
    enabled: false,  // Set to true for Norwegian greeting
    greeting: "Gratulerer med dagen!"
  }
};
```

**Step 4: Update CLAUDE.md**

Update `CLAUDE.md` to reflect new architecture:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A reusable, config-driven birthday card website featuring:
- Modern, elegant design with birthday celebration vibes
- Enhanced animations (confetti, transitions, hover effects)
- Mobile-first responsive design
- Norwegian cultural influences
- 25th milestone celebration elements
- Configurable audio playback
- Theme-ready architecture for future extensibility

## Project Structure

Modular vanilla JavaScript architecture:
- `config.js` - Birthday person's info (EDIT THIS for each card)
- `theme.js` - Theme configuration (colors, fonts, animations)
- `app.js` - Core application logic (validation, DOM manipulation, animations)
- `index.html` - Semantic HTML structure
- `styles.css` - Mobile-first CSS with CSS variables for theming
- `assets/` - Photos and audio files

## Quick Customization

To create a birthday card:
1. Edit `config.js` - Update name, age, photo, message
2. Add photo to `assets/` or use URL
3. (Optional) Add audio file to `assets/`
4. Open `index.html` in browser or use local server

## Running the Project

```bash
# Option 1: Open directly
open index.html

# Option 2: Python server (recommended)
python3 -m http.server 8000

# Option 3: Node server
npx http-server
```

## Key Architecture Decisions

**Separation of Concerns:**
- `config.js` = Content (who, what, when)
- `theme.js` = Presentation (colors, fonts, animations)
- `app.js` = Behavior (DOM manipulation, events, animations)
- `styles.css` = Layout and structure

**Theme System:**
- CSS variables enable theme switching
- Future themes: Create `theme-<name>.js` files
- No CSS rewrites needed - just swap variable values

**Mobile-First:**
- Breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop)
- Reduced animations/particles on mobile
- Fluid typography using `clamp()`
- Touch targets minimum 44px

**Accessibility:**
- Semantic HTML
- Respects `prefers-reduced-motion`
- Keyboard navigation support
- ARIA labels for screen readers

## Development Guidelines

**When modifying:**
- Test on mobile first (resize browser to 375px)
- Verify accessibility (keyboard nav, reduced motion)
- Check error handling (invalid config, missing images, broken audio)
- Ensure confetti performance on mobile
- Maintain separation of concerns (don't mix config/theme/logic)

**Common tasks:**
- Add new theme: Copy `theme.js` → `theme-<name>.js`, modify colors/fonts
- Change milestone age: Modify age check in `populateContent()`
- Adjust confetti intensity: Edit `theme.js` → `confettiIntensity`
- Add custom animations: Use CSS variables for durations

## Testing Checklist

Before deploying:
- [ ] Valid config loads correctly
- [ ] Invalid config shows user-friendly errors
- [ ] Photo loads (both local file and URL)
- [ ] Photo error shows initials placeholder
- [ ] Audio plays correctly (if enabled)
- [ ] Audio hides gracefully (if disabled or file missing)
- [ ] Confetti animates smoothly
- [ ] Mobile responsive (test at 375px, 768px, 1024px+)
- [ ] Hover effects work on desktop
- [ ] Keyboard navigation works
- [ ] Reduced motion respected
- [ ] No console errors
- [ ] Page weight < 1MB

## Future Enhancements

**Phase 2 (Multiple Themes):**
- Add theme selector to config
- Create 2-3 additional themes
- Theme preview system

**Phase 3 (Rich Content):**
- Photo gallery/slideshow
- Multiple messages
- Timeline of memories
- Custom music playlist

## Dependencies

**External (CDN):**
- Google Fonts: Playfair Display, Inter

**No build tools, no frameworks, no npm packages.**

## Browser Support

Modern browsers (last 2 years):
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
```

**Step 5: Verify all documentation is complete**

Check that these files exist and are complete:
- ✅ `README.md` - User-facing documentation
- ✅ `CLAUDE.md` - Developer guidance
- ✅ `docs/plans/2026-02-15-birthday-card-redesign-design.md` - Design doc
- ✅ `docs/plans/2026-02-15-birthday-card-redesign.md` - This implementation plan

---

## Task 15: Final Verification & Delivery

**Files:**
- All files

**Step 1: Perform complete test suite**

Run through all tests from Task 13 one final time.

**Step 2: Create example birthday card**

Create a real example for the user's roommate:

1. Get roommate's name, age, photo from user
2. Update `config.js` with real information
3. Test that it works perfectly

**Step 3: Test on actual mobile device**

If possible, test on a real phone:
- Transfer files to phone or deploy to simple hosting
- Test all features
- Verify performance

**Step 4: Create deployment instructions**

Add to README:

```markdown
## Deployment

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Push code to repository
3. Go to Settings → Pages
4. Select branch and save
5. Your card will be live at `https://username.github.io/repo-name`

### Option 2: Netlify Drop (Free)
1. Go to https://app.netlify.com/drop
2. Drag and drop your folder
3. Your card is instantly live!

### Option 3: Share Files Directly
1. Zip the entire folder
2. Send to recipient
3. Recipient opens `index.html` in browser
```

**Step 5: Final console check**

Open browser console and verify:
- No errors
- Only expected logs (initialization, config valid, etc.)
- No warnings

**Step 6: Browser compatibility check**

Test in at least 2 different browsers (Chrome, Firefox, Safari, or Edge).

**Step 7: Performance check**

Run Lighthouse audit:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90

**Step 8: Documentation review**

Read through README and ensure all instructions are clear and accurate.

---

## Completion Checklist

Before marking this plan as complete:

- [ ] All 15 tasks completed
- [ ] Config system works perfectly
- [ ] Theme system works and is extensible
- [ ] All animations are smooth
- [ ] Mobile responsive design tested
- [ ] Photo loading with error handling works
- [ ] Audio player works (or hides gracefully)
- [ ] Confetti performs well on mobile
- [ ] Norwegian greeting displays correctly
- [ ] 25th milestone badge shows for age 25
- [ ] Error handling is user-friendly
- [ ] Accessibility tested (keyboard, reduced motion)
- [ ] Documentation complete (README, CLAUDE.md)
- [ ] No console errors
- [ ] Performance targets met
- [ ] Browser compatibility verified
- [ ] Ready to deploy and share

---

## Notes for Implementation

**Commit Frequency:**
- Commit after each major task (every 2-3 steps)
- Use descriptive commit messages
- Follow pattern: `feat: description` or `fix: description`

**Testing Strategy:**
- Test after each step where indicated
- Don't move to next task until current task fully works
- When something breaks, fix it immediately

**Code Quality:**
- Keep functions small and focused
- Add comments for complex logic
- Use consistent naming conventions
- Validate all user input

**Performance:**
- Keep mobile performance in mind
- Test confetti particle count on mobile
- Optimize images if needed
- Monitor page weight

---

**Plan Status:** Ready for implementation
**Estimated Time:** 4-6 hours (with testing)
**Complexity:** Medium
**Dependencies:** None
