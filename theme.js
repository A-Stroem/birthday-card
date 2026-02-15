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
