/**
 * Birthday Card Configuration
 *
 * Edit this file to customize the birthday card for different people.
 * Required fields: name, age, photo.source
 * Optional fields: message, insideNote, audio, norwegianTouch
 */

const birthdayConfig = {
  // Required: Person's name
  name: "Natalie",

  // Required: Person's age
  age: 25,

  // Required: Photo configuration
  photo: {
    source: "assets/jackbox.png", // Can be local path or URL
    alt: "Jackbox games",
  },

  // Optional: Birthday message
  message: "Gratulerer med dagen og de 25 år!",

  // Optional: Handwritten-style note shown inside the opened card
  insideNote:
    "Gavekort: En valgfri Jackbox pakke til Nintendo Switch. Send blot en mobilepay anmodning når du har udvalgt den.\n\nHåber du får en fantastisk dag fyldt med glæde og god mad! 🎉🎂",

  // Optional: Audio configuration
  audio: {
    enabled: true,
    source: "assets/birthday-song.mp3",
    autoPlayOnOpen: true, // Try autoplay when the card opens; falls back to button click
    label: "Play Birthday Song",
  },

  // Optional: Norwegian touches
  norwegianTouch: {
    enabled: true,
    greeting: "Gratulerer med dagen!", // Norwegian "Happy Birthday"
  },
};
