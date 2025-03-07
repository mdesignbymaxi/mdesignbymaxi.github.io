// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Public Chat
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Load chat messages from localStorage
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

// Display messages
function displayMessages() {
    chatBox.innerHTML = messages.map(msg => `
        <div class="message">
            <strong>User:</strong> ${msg}
        </div>
    `).join('');
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Add new message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        displayMessages();
        chatInput.value = ''; // Clear input
    }
});

// Initial display
displayMessages();

// Flappy Hat Game
const hat = document.getElementById('hat');
const obstacleTop = document.getElementById('obstacle-top');
const obstacleBottom = document.getElementById('obstacle-bottom');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isGameOver = false;

// Hat Movement
let hatY = 250; // Initial Y position of the hat
const gravity = 1.5; // Gravity effect
let velocity = 0;

// Obstacle Movement
let obstacleX = 400; // Initial X position of obstacles
const obstacleSpeed = 3; // Speed of obstacles

// Update Game State
function updateGame() {
    if (isGameOver) return;

    // Apply gravity to the hat
    velocity += gravity;
    hatY += velocity;
    hat.style.top = hatY + 'px';

    // Move obstacles
    obstacleX -= obstacleSpeed;
    obstacleTop.style.right = obstacleX + 'px';
    obstacleBottom.style.right = obstacleX + 'px';

    // Check for collision
    if (
        hatY < 0 || hatY > 560 || // Hat hits top or bottom
        (obstacleX < 90 && obstacleX > 50 && // Hat hits obstacle
            (hatY < 200 || hatY > 400))
    ) {
        endGame();
    }

    // Reset obstacles when they go off-screen
    if (obstacleX < -60) {
        obstacleX = 400;
        score++;
        scoreDisplay.textContent = score;
    }

    requestAnimationFrame(updateGame);
}

// Handle User Input (Spacebar or Click)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        velocity = -15; // Make the hat jump
    }
});

document.addEventListener('click', () => {
    velocity = -15; // Make the hat jump
});

// End Game
function endGame() {
    isGameOver = true;
    alert(`Game Over! Your score: ${score}`);
    location.reload(); // Restart the game
}

// Start the Game
updateGame();
