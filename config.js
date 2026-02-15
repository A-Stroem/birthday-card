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
