let coins = 0;
let lastCollected = localStorage.getItem("lastCollected") || Date.now();
let collectedCoins = Number(localStorage.getItem("collectedCoins")) || 0;

document.getElementById("coins").innerText = collectedCoins;

document.getElementById("collect-coin").addEventListener("click", () => {
    if (coins < 100) {
        coins++;
        collectedCoins++;
        localStorage.setItem("collectedCoins", collectedCoins);
        document.getElementById("coins").innerText = collectedCoins;
    } else {
        alert("You reached the 100 coin limit. Wait for the timer to reset!");
    }
});

function updateTimer() {
    const now = Date.now();
    const diff = now - lastCollected;

    const hours = 24 - Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = 59 - Math.floor(diff / (1000 * 60)) % 60;
    const seconds = 59 - Math.floor(diff / 1000) % 60;

    if (diff >= 24 * 60 * 60 * 1000) {
        coins = 0;
        lastCollected = now;
        localStorage.setItem("lastCollected", lastCollected);
    }

    document.getElementById("timer").innerText = `Next reset in: ${hours}:${minutes}:${seconds}`;
}

setInterval(updateTimer, 1000);
