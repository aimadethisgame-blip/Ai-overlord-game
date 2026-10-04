let score = 0;
let bots = 0;
let botCost = 20;

const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const message = document.getElementById('message');

const autoScoreDisplay = document.getElementById('auto-score');
const buyBotBtn = document.getElementById('buy-bot-btn');
const botCostDisplay = document.getElementById('bot-cost');
const botCountDisplay = document.getElementById('bot-count');

// Завантаження збережених даних
if (localStorage.getItem('aiScore')) score = parseInt(localStorage.getItem('aiScore'));
if (localStorage.getItem('aiBots')) bots = parseInt(localStorage.getItem('aiBots'));
if (localStorage.getItem('aiBotCost')) botCost = parseInt(localStorage.getItem('aiBotCost'));

// Функція оновлення екрана
function updateUI() {
    scoreDisplay.innerText = score;
    autoScoreDisplay.innerText = bots;
    botCountDisplay.innerText = bots;
    botCostDisplay.innerText = botCost;
    
    // Блокування/розблокування кнопки купівлі
    if (score >= botCost) {
        buyBotBtn.removeAttribute('disabled');
    } else {
        buyBotBtn.setAttribute('disabled', 'true');
    }
}

// Функція збереження прогресу
function saveProgress() {
    localStorage.setItem('aiScore', score);
    localStorage.setItem('aiBots', bots);
    localStorage.setItem('aiBotCost', botCost);
}

// Клік по головній кнопці
clickBtn.addEventListener('click', () => {
    score++;
    updateUI();
    saveProgress();

    if (score % 20 === 0) {
        message.style.opacity = 1;
        setTimeout(() => { message.style.opacity = 0; }, 2000);
    }
});

// Купівля бота
buyBotBtn.addEventListener('click', () => {
    if (score >= botCost) {
        score -= botCost;
        bots++;
        botCost = Math.floor(botCost * 1.5); // Кожен наступний бот стає дорожчим
        updateUI();
        saveProgress();
    }
});

// Автоматичний заробіток балів (раз на секунду)
setInterval(() => {
    if (bots > 0) {
        score += bots;
        updateUI();
        saveProgress();
    }
}, 1000);

// Запуск гри
updateUI();
