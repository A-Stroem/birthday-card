# Twin Peaks Red Room Theme — Design Spec

**Date:** 2026-04-17
**Status:** Approved

## Overview

Retheme the birthday card for Gustav (age 26) with a Twin Peaks Red Room aesthetic: near-black background, deep crimson, warm gold, cream text, and a subtle chevron floor pattern. The Criterion Blu-ray box art (`assets/twin-peaks.png`) is used as the card photo.

## Content Changes (`config.js`)

- `name`: "Gustav"
- `age`: 26
- `photo.source`: "assets/twin-peaks.png"
- `photo.alt`: "Twin Peaks: Fire Walk With Me – Criterion Collection"
- `norwegianTouch.greeting`: "🇩🇰 Tillykke med fødselsdagen!" (flag embedded in string)
- `insideNote`: left for manual editing by user

## Theme Changes (`theme.js`)

```
name: "twin-peaks-red-room"
colors:
  primary:    #C9A84C   (warm gold / candlelight)
  secondary:  #8B1A1A   (deep crimson)
  accent:     #5C0A0A   (dark blood red)
  background: #0D0507   (near-black with red undertone)
  text:       #F5E6D3   (cream)
  textLight:  #B8956A   (warm tan)
  error:      #DC2626   (keep)
fonts:
  heading: 'Playfair Display', serif
  body:    'Special Elite', cursive
```

## HTML Changes (`index.html`)

- Add `Special Elite` to Google Fonts import alongside Playfair Display.

## CSS Changes (`styles.css`)

- **Body background**: dark radial gradient in near-black/crimson tones, replacing the warm light gradient.
- **Card cover**: deep crimson-to-black gradient (top crimson → bottom near-black), evoking the Red Room curtains.
- **Card inside / hero**: dark background with a subtle CSS chevron floor pattern (repeating diagonal lines at low opacity).
- **Inside note panel**: dark semi-transparent panel (not white paper) with cream text.
- **Norwegian greeting `::before`**: remove the hardcoded `🇳🇴` emoji — flag now lives in the config string.
- **Focus outlines**: keep but use gold (`--color-primary`) to match new palette.

## Confetti

No code change. `ConfettiManager` already reads `--color-primary` (gold) and `--color-accent` (dark red) from CSS variables, so confetti will automatically shift to a crimson/gold palette.
