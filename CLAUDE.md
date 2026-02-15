# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Reusable, config-driven birthday card website featuring:
- Modern, elegant visual style
- Configurable content (`config.js`)
- Configurable theme tokens (`theme.js`)
- Optional audio player
- Confetti and scroll-enhancement animations
- Mobile-first responsive design

## Architecture

Separation of concerns:
- `config.js`: content data (name, age, photo, message, optional audio/greeting)
- `theme.js`: theme tokens (colors, fonts, animation settings)
- `app.js`: behavior (validation, DOM population, media handling, animations)
- `styles.css`: layout + visuals using CSS variables
- `index.html`: semantic structure and script wiring

## Running

```bash
# Option 1
open index.html

# Option 2 (recommended)
python3 -m http.server 8000

# Option 3
npx http-server
```

## Customization Workflow

1. Edit `config.js` with the birthday person's details.
2. Update `theme.js` for colors/fonts/animation intensity if needed.
3. Add or adjust local assets in `assets/`.
4. Validate in desktop and mobile breakpoints.

## Implementation Notes

- `app.js` validates required fields before rendering.
- Config errors render in-page in `#errorDisplay`.
- Photo loading includes skeleton + initials fallback.
- Audio hides gracefully when disabled or invalid.
- Confetti respects `prefers-reduced-motion` and scales on mobile.
- Scroll reveal effects only run on mobile/tablet widths.

## QA Expectations

Before shipping, verify:
- Valid config renders fully.
- Invalid config surfaces clear errors.
- Milestone badge appears only at age 25.
- Photo fallback works for bad URLs/paths.
- Audio behavior is correct for enabled/disabled modes.
- Keyboard focus and reduced-motion behavior are intact.
- No console errors.
