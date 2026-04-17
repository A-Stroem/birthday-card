/**
 * Birthday Card Configuration
 *
 * Edit this file to customize the birthday card for different people.
 * Required fields: name, age, photo.source
 * Optional fields: message, insideNote, audio, norwegianTouch
 */

const birthdayConfig = {
  // Required: Person's name
  name: "Gustav",

  // Required: Person's age
  age: 26,

  // Required: Photo configuration
  photo: {
    source: "assets/twin-peaks.png", // Can be local path or URL
    alt: "Twin Peaks: Fire Walk With Me – Criterion Collection",
  },

  // Optional: Birthday message
message: "Tillykke med fødselsdagen og de 26 år! Twin Peaks er på vej!",

  // Optional: Handwritten-style note shown inside the opened card
  insideNote: "",

  // Optional: Audio configuration
  audio: {
    enabled: true,
    source: "assets/birthday-song.mp3",
    autoPlayOnOpen: true, // Try autoplay when the card opens; falls back to button click
    label: "Play Birthday Song",
  },

  // Optional: Greeting with flag (flag emoji included in the string)
  norwegianTouch: {
    enabled: false,
    greeting: "🇩🇰 Tillykke med fødselsdagen!", // Danish "Happy Birthday"
  },
};
