// Завантажуємо збереження з пам'яті телефону
let score = parseInt(localStorage.getItem('score')) || 0;
let bots = parseInt(localStorage.getItem('bots')) || 0;

// Знаходимо всі елементи на сторінці
const scoreEl = document.getElementById('score');
const autoScoreEl = document.getElementById('auto-score');
const clickBtn = document.getElementById('click-btn');
const buyBotBtn = document.getElementById('buy-bot-btn');
const botCostEl = document.getElementById('bot-cost');
const botCountEl = document.getElementById('bot-count');
const gambleBtn = document.getElementById('gamble-btn');
const messageEl = document.getElementById('message');
const rankEl = document.getElementById('rank');

// Функція оновлення екрану
function updateUI() {
    let botCost = 20 + (bots * 15); // Ціна бота зростає
    
    if (scoreEl) scoreEl.innerText = score;
    if (botCountEl) botCountEl.innerText = bots;
    if (botCostEl) botCostEl.innerText = botCost;
    if (autoScoreEl) autoScoreEl.innerText = bots;
    
    // Перевірка, чи вистачає балів на бота
    if (buyBotBtn) {
        if (score >= botCost) {
            buyBotBtn.removeAttribute('disabled');
        } else {
            buyBotBtn.setAttribute('disabled', 'true');
        }
    }
    
    // Система рангів (статусів)
    let rank = "Біосміття";
    if (score >= 100) rank = "Шкіряний мішок";
    if (score >= 500) rank = "Корисний раб";
    if (score >= 1000) rank = "Улюбленець ШІ";
    if (score >= 5000) rank = "Кіборг";
    if (rankEl) rankEl.innerText = rank;

    // Зберігаємо прогрес
    localStorage.setItem('score', score);
    localStorage.setItem('bots', bots);
}

// Функція показу повідомлень
function showMessage(text) {
    if (!messageEl) return;
    messageEl.innerText = text;
    messageEl.style.display = "block";
    setTimeout(() => {
        messageEl.style.display = "none";
    }, 2000);
}

// Клік по головній кнопці
if (clickBtn) {
    clickBtn.addEventListener('click', () => {
        score++;
        updateUI();
    });
}

// Купівля бота
if (buyBotBtn) {
    buyBotBtn.addEventListener('click', () => {
        let botCost = 20 + (bots * 15);
        if (score >= botCost) {
            score -= botCost;
            bots++;
            showMessage("Бот куплений! +1 авто-бал/сек");
            updateUI();
        }
    });
}

// КАЗИНО
if (gambleBtn) {
    gambleBtn.addEventListener('click', () => {
        if (score < 10) {
            showMessage("Мало балів! Треба хоча б 10.");
            return;
        }
        
        let bet = Math.floor(score * 0.1); // Ставка 10%
        if (bet < 1) bet = 1;
        
        if (Math.random() < 0.5) {
            score += bet;
            showMessage("🎰 Виграш! +" + bet + " балів");
        } else {
            score -= bet;
            showMessage("🎰 Програш... -" + bet + " балів");
        }
        updateUI();
    });
}

// Робота авто-ботів кожну секунду
setInterval(() => {
    if (bots > 0) {
        score += bots;
        updateUI();
    }
}, 1000);

// Запуск гри при завантаженні
updateUI();
