// Game Logic
let coins = 0;
const maxCoinsPerDay = 100;

// Check reset from localStorage
const lastReset = localStorage.getItem('lastReset') || Date.now();
if (Date.now() - lastReset > 24 * 60 * 60 * 1000) {
    coins = 0; // Reset daily limit
    localStorage.setItem('lastReset', Date.now());
} else {
    coins = parseInt(localStorage.getItem('coins') || '0');
}

// Update UI
const coinDisplay = document.getElementById('coinsCollected');
const resetTimer = document.getElementById('resetTimer');
updateUI();

// Collect coin event
document.getElementById('collectCoin').addEventListener('click', () => {
    if (coins < maxCoinsPerDay) {
        coins++;
        localStorage.setItem('coins', coins);
        updateUI();
    } else {
        alert('Daily limit reached! Please wait for the next reset.');
    }
});

// Update UI function
function updateUI() {
    coinDisplay.textContent = `Coins Collected: ${coins}`;
    const timeLeft = calculateTimeLeft();
    resetTimer.textContent = `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`;
}

// Calculate time left for reset
function calculateTimeLeft() {
    const now = Date.now();
    const resetTime = new Date(parseInt(localStorage.getItem('lastReset'))).getTime() + 24 * 60 * 60 * 1000;
    const diff = resetTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return { hours, minutes, seconds };
}
