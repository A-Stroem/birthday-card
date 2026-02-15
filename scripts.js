// Confetti animation when the page loads
window.onload = () => {
    startConfetti();
};

// Confetti function
function startConfetti() {
    const confettiSettings = { 
        particleCount: 150, 
        spread: 80, 
        origin: { y: 0.35 }
    };
    // Fire confetti at interval
    setInterval(() => {
        confetti(Object.assign({}, confettiSettings, { angle: Math.random() * 360 }));
    }, 500);
}

// Audio controls
const playButton = document.getElementById('play-button');
const birthdaySong = document.getElementById('birthday-song');

playButton.addEventListener('click', () => {
    birthdaySong.play();
    playButton.textContent = "Enjoy the song!";
    playButton.disabled = true;
});