// Configurable variables - Change these to customize
const BIRTHDAY_DATE = new Date('2026-12-26T00:00:00'); // Set to the birthday date at midnight
const HER_NAME = 'Suchetha'; // Change to the person's name

// Messages for typewriter effect
const typewriterMessages = [
    '> Compiling memories...',
    '> Loading smiles...',
    '> Waiting for the most special day...'
];

// Random birthday messages
const birthdayMessages = [
    'You’re my favorite notification.',
    'You optimize my happiness in O(1) time.',
    'You’re the bug I never want to fix.',
    'You are my favorite person.\nToday.\nTomorrow.\nForever.\n\nHappy Birthday ❤️',
    'Wishing you a day filled with love and joy!',
    'May your birthday be as wonderful as you are!',
    'Here’s to another year of amazing memories together!',
    'You light up my life like no one else. Happy Birthday!',
    'To the most incredible person I know, happy birthday!',
    'May all your dreams come true on your special day!',
    'Happy Birthday, my love, miles can`t separate us',
    'Counting down `til we celebrate in person'
];

// DOM elements
const lockScreen = document.getElementById('lock-screen');
const transitionScreen = document.getElementById('transition-screen');
const birthdayScreen = document.getElementById('birthday-screen');
const countdownEl = document.getElementById('countdown');
const typewriterEl = document.getElementById('typewriter');
const patienceMessage = document.getElementById('patience-message');
const birthdayHeading = document.getElementById('birthday-heading');
const randomMessageEl = document.getElementById('random-message');
const bgMusic = document.getElementById('bg-music');
const confettiContainer = document.getElementById('confetti-container');

// State
let countdownInterval;
let typewriterIndex = 0;
let isUnlocked = false;

// Initialize the website
function init() {
    updateTabTitle(false);
    generateHearts();
    startCountdown();
    startTypewriter();
    setupEventListeners();
    updateBirthdayHeading();
}

// Update tab title
function updateTabTitle(isBirthday) {
    document.title = isBirthday ? '🎉 Happy Birthday ❤️' : '⏳ Waiting for Her Birthday...';
}

// Generate floating hearts for lock screen
function generateHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Start countdown timer
function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const timeLeft = BIRTHDAY_DATE - now;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        unlockWebsite();
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days.toString().padStart(2, '0')} : ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}

// Typewriter effect
function startTypewriter() {
    let charIndex = 0;
    const currentMessage = typewriterMessages[typewriterIndex];

    function type() {
        if (charIndex < currentMessage.length) {
            typewriterEl.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterEl.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            typewriterIndex = (typewriterIndex + 1) % typewriterMessages.length;
            setTimeout(type, 500);
        }
    }

    type();
}

// Setup event listeners for lock screen interactions
function setupEventListeners() {
    document.addEventListener('scroll', showPatienceMessage);
    document.addEventListener('click', showPatienceMessage);
    document.addEventListener('keydown', showPatienceMessage);
}

function showPatienceMessage() {
    if (isUnlocked) return;
    patienceMessage.classList.remove('hidden');
    setTimeout(() => patienceMessage.classList.add('hidden'), 2000);
}

// Unlock website at midnight
function unlockWebsite() {
    isUnlocked = true;
    updateTabTitle(true);

    // Fade to transition
    lockScreen.classList.add('hidden');
    transitionScreen.classList.remove('hidden');

    // Play music
    bgMusic.play();

    // Show confetti
    generateConfetti();

    // Transition to birthday screen after 3 seconds
    setTimeout(() => {
        transitionScreen.classList.add('hidden');
        birthdayScreen.classList.remove('hidden');
        generateMeteors();
        generateFloatingHearts();
        generateBalloons();
        showRandomMessage();
        // Change message every 4 seconds
        setInterval(showRandomMessage, 10000);
    }, 3000);
}

// Generate confetti animation
function generateConfetti() {
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Generate meteors for birthday screen
function generateMeteors() {
    const meteorsContainer = document.querySelector('.meteors-background');
    for (let i = 0; i < 15; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = Math.random() * 100 + '%';
        meteor.style.animationDelay = Math.random() * 5 + 's';
        meteorsContainer.appendChild(meteor);
    }
}

// Generate floating hearts for birthday screen
function generateFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heartsContainer.appendChild(heart);
    }
}

// Generate balloons for birthday screen
function generateBalloons() {
    const balloonsContainer = document.querySelector('.balloons');
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.animationDelay = Math.random() * 10 + 's';
        balloonsContainer.appendChild(balloon);
    }
}

// Update birthday heading with name
function updateBirthdayHeading() {
    birthdayHeading.textContent = `Happy Birthday, ${HER_NAME} 🎂❤️`;
}

// Show random birthday message
function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * birthdayMessages.length);
    randomMessageEl.textContent = birthdayMessages[randomIndex];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

