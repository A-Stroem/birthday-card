# Birthday Card

Reusable, config-driven birthday card website with modern design, smooth animations, and optional Norwegian touches.

## Features

- Config-based customization in one file (`config.js`)
- Theme-ready styling system (`theme.js` + CSS variables)
- Mobile-first responsive layout
- Confetti animation with mobile/reduced-motion optimization
- 25th milestone badge (`Quarter Century!`) when age is 25
- Safe config validation with user-friendly error display
- Photo loading with skeleton and initials fallback
- Optional audio playback controls

## Quick Start

1. Edit `config.js`.
2. Add photo/audio assets if you want local files.
3. Open `index.html` directly or run a local server.

```bash
# Direct open (macOS)
open index.html

# Python server (recommended)
python3 -m http.server 8000

# Node server
npx http-server
```

Then open `http://localhost:8000`.

## Configuration

`config.js` supports:

- Required:
  - `name` (string)
  - `age` (number)
  - `photo.source` (string: URL or local path)
- Optional:
  - `photo.alt` (string)
  - `message` (string)
  - `insideNote` (string)
  - `audio.enabled` (boolean)
  - `audio.source` (string)
  - `audio.autoPlayOnOpen` (boolean)
  - `audio.label` (string)
  - `norwegianTouch.enabled` (boolean)
  - `norwegianTouch.greeting` (string)

## Theme Customization

Edit `theme.js`:

- `colors`: primary, secondary, accent, background, text, textLight, error
- `fonts`: heading, body
- `animations.confettiIntensity`: `low` | `medium` | `high`
- `animations.enableParticles`: `true` | `false`
- `animations.duration`: fast, normal, slow

## Project Structure

```text
birthday-card/
├── index.html
├── styles.css
├── app.js
├── config.js
├── theme.js
├── assets/
├── docs/plans/
└── CLAUDE.md
```

## Accessibility

- Semantic HTML structure
- Keyboard focus-visible styling
- `prefers-reduced-motion` respected
- Screen-reader labels for interactive controls

## Browser Support

Modern browsers (last ~2 years):

- Chrome / Edge
- Firefox
- Safari

## Deployment

### Option 1: GitHub Pages

1. Create a repo and push this folder.
2. Enable Pages in repository settings.
3. Select branch/folder and publish.

### Option 2: Netlify Drop

1. Go to `https://app.netlify.com/drop`.
2. Drag and drop the project folder.
3. Share generated URL.

### Option 3: Share as Files

1. Zip the folder.
2. Share it.
3. Recipient opens `index.html`.
