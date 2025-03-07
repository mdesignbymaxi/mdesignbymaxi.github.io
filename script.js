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
