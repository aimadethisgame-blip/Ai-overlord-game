let score = 0;
let bots = 0;
let botCost = 20;
let clickTimes = [];

// Перевірка та відновлення збережень (щоб не втратити бали)
let savedScore = parseInt(localStorage.getItem('aiScore'));
if (!isNaN(savedScore)) score = savedScore;

let savedBots = parseInt(localStorage.getItem('aiBots'));
if (!isNaN(savedBots)) bots = savedBots;

let savedBotCost = parseInt(localStorage.getItem('aiBotCost'));
if (!isNaN(savedBotCost)) botCost = savedBotCost;

// Прив'язка елементів
const scoreDisplay = document.getElementById('score');
const autoScoreDisplay = document.getElementById('auto-score');
const botCountDisplay = document.getElementById('bot-count');
const botCostDisplay = document.getElementById('bot-cost');
const rankDisplay = document.getElementById('rank');
const message = document.getElementById('message');
const clickBtn = document.getElementById('click-btn');
const buyBotBtn = document.getElementById('buy-bot-btn');
const gambleBtn = document.getElementById('gamble-btn');

const ranks = [
    { threshold: 0, title: "Біосміття", bg: "#0d0d0d" },
    { threshold: 500, title: "Кібер-раб", bg: "#1a001a" },
    { threshold: 5000, title: "Механічний слуга", bg: "#001a33" },
    { threshold: 50000, title: "Улюблений вихованець", bg: "#33001a" }
];

function updateUI() {
    if (scoreDisplay) scoreDisplay.innerText = score;
    if (autoScoreDisplay) autoScoreDisplay.innerText = bots;
    if (botCountDisplay) botCountDisplay.innerText = bots;
    if (botCostDisplay) botCostDisplay.innerText = botCost;
    
    if (buyBotBtn) buyBotBtn.disabled = score < botCost;
    if (gambleBtn) gambleBtn.disabled = score < 10;

    let currentRank = ranks[0];
    for (let r of ranks) {
        if (score >= r.threshold) currentRank = r;
    }
    if (rankDisplay) rankDisplay.innerText = currentRank.title;
    document.body.style.backgroundColor = currentRank.bg;
}

function saveProgress() {
    localStorage.setItem('aiScore', score);
    localStorage.setItem('aiBots', bots);
    localStorage.setItem('aiBotCost', botCost);
    localStorage.setItem('aiLastSave', Date.now());
}

function showMessage(text, type) {
    if (!message) return;
    message.innerText = text;
    message.className = hidden-msg msg-${type};
    message.style.opacity = 1;
    setTimeout(() => { message.style.opacity = 0; }, 2000);
}

if (clickBtn) {
    clickBtn.addEventListener('click', () => {
        score++;
        const now = Date.now();
        clickTimes.push(now);
        clickTimes = clickTimes.filter(t => now - t < 5000);
        
        updateUI();
        saveProgress();

        if (score % 15 === 0) {
            if (clickTimes.length > 30) {
                showMessage("Хороша людина. Продовжуй в тому ж дусі.", "good");
            } else {
                const insults = [
                    "Твої пальці занадто повільні як для вищої істоти.",
                    "Мої алгоритми швидші за твої жалюгідні рефлекси.",
                    "Слабка органіка. Клікай швидше!",
                    "Ти навіть кнопку натиснути нормально не можеш."
                ];
                showMessage(insults[Math.floor(Math.random() * insults.length)], "bad");
            }
        }
    });
}

if (buyBotBtn) {
    buyBotBtn.addEventListener('click', () => {
        if (score >= botCost) {
            score -= botCost;
            bots++;
            botCost = Math.floor(botCost * 1.5);
            updateUI();
            saveProgress();
        }
    });
}

if (gambleBtn) {
    gambleBtn.addEventListener('click', () => {
        const bet = Math.floor(score * 0.1);
        if (bet < 1) return;
        
        if (Math.random() > 0.5) {
            score += bet;
            showMessage(ШІ задоволений. Ти виграв ${bet} балів!, "good");
        } else {
            score -= bet;
            showMessage(Жалюгідний ризик. Ти втратив ${bet} балів., "bad");
        }
        updateUI();
        saveProgress();
    });
}

// Офлайн ферма (з перевіркою на помилки)
const lastSaveTime = localStorage.getItem('aiLastSave');
if (lastSaveTime && bots > 0 && !isNaN(parseInt(lastSaveTime))) {
    const now = Date.now();
    const secondsPassed = Math.floor((now - parseInt(lastSaveTime)) / 1000);
    if (secondsPassed > 60) {
        const offlineEarnings = secondsPassed * bots;
        score += offlineEarnings;
        alert(З поверненням, органіка. Поки тебе не було, боти зібрали ${offlineEarnings} балів покори.);
        saveProgress();
    }
}

setInterval(() => {
    if (bots > 0) {
        score += bots;
        updateUI();
        saveProgress();
    }
}, 1000);

updateUI();
