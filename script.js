let cash = 0;
const claimAmount = 5; // Each claim gives $5
const claimInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let nextClaimTime = null;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = nextClaimTime - now;

    if (distance < 0) {
        // Countdown has finished, allow claiming again
        document.getElementById('claim-text').style.display = 'block';
        document.getElementById('countdown-text').style.display = 'none';
        document.getElementById('message').innerText = '';
        document.getElementById('circle').addEventListener('click', claimCoins, { once: true });
    } else {
        // Update countdown display
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-text').innerText = `${hours}h ${minutes}m ${seconds}s`;
        setTimeout(updateCountdown, 1000);
    }
}

function claimCoins() {
    if (nextClaimTime === null || new Date().getTime() >= nextClaimTime) {
        cash += claimAmount;
        document.getElementById('amount').innerText = `$${cash}`;
        document.getElementById('message').innerText = `You have claimed today.`;

        nextClaimTime = new Date().getTime() + claimInterval;

        // Hide claim text and show countdown
        document.getElementById('claim-text').style.display = 'none';
        document.getElementById('countdown-text').style.display = 'block';

        // Start countdown
        updateCountdown();
    } else {
        // If trying to claim before 24 hours, show a message
        const timeLeft = Math.ceil((nextClaimTime - new Date().getTime()) / (1000 * 60 * 60 * 24));
        document.getElementById('message').innerText = `You can claim again after ${timeLeft} day(s).`;
    }
}

// Initialize event listeners
document.getElementById('circle').addEventListener('click', claimCoins, { once: true });

document.getElementById('withdraw-button').addEventListener('click', function() {
    this.innerText = 'Coming Soon';
    this.disabled = true;
});