/**
 * Theme Configuration
 *
 * Defines visual styling for the birthday card.
 * Future: Can create multiple theme files (theme-playful.js, theme-minimal.js)
 */

const theme = {
  name: "twin-peaks-red-room",

  colors: {
    primary: "#C9A84C",      // Warm gold / candlelight
    secondary: "#8B1A1A",    // Deep crimson
    accent: "#5C0A0A",       // Dark blood red
    background: "#0D0507",   // Near-black with red undertone
    text: "#F5E6D3",         // Cream
    textLight: "#B8956A",    // Warm tan
    error: "#DC2626"         // Red for errors
  },

  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Special Elite', cursive"
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
