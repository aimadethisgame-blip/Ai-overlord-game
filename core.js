Karl:
document.addEventListener('DOMContentLoaded', () => {
    try {
        let score = parseInt(localStorage.getItem('aiScore')) || 0;
        let bots = parseInt(localStorage.getItem('aiBots')) || 0;
        let factories = parseInt(localStorage.getItem('aiFactories')) || 0;
        let matrices = parseInt(localStorage.getItem('aiMatrices')) || 0;
        let multiplier = parseInt(localStorage.getItem('aiMultiplier')) || 1;
        let hasCyberBg = localStorage.getItem('aiHasCyberBg') === 'true';
        let lastSave = parseInt(localStorage.getItem('aiLastSave')) || Date.now();

        let botCost = 100;
        let factoryCost = 1000;
        let matrixCost = 10000;

        const scoreEl = document.getElementById('score');
        const autoScoreEl = document.getElementById('auto-score');
        const multiplierEl = document.getElementById('multiplier');
        const rankEl = document.getElementById('rank');
        const msgEl = document.getElementById('message');

        const clickBtn = document.getElementById('click-btn');
        const gambleBtn = document.getElementById('gamble-btn');
        const betInput = document.getElementById('bet-amount');
        const betMaxBtn = document.getElementById('bet-max-btn');
        const casinoResult = document.getElementById('casino-result');
        const prestigeBtn = document.getElementById('prestige-btn');

        const buyBotBtn = document.getElementById('buy-bot-btn');
        const buyFactoryBtn = document.getElementById('buy-factory-btn');
        const buyMatrixBtn = document.getElementById('buy-matrix-btn');
        const buyBgCyber = document.getElementById('buy-bg-cyber');

        function showMsg(text, good = false) {
            msgEl.innerText = text;
            msgEl.style.color = good ? "#33ff33" : "#ff3333";
            msgEl.style.opacity = 1;
            setTimeout(() => msgEl.style.opacity = 0, 3500);
        }

        // Офлайн ферма (інтегрована в UI, без блокування екрану)
        const now = Date.now();
        const secondsOffline = Math.floor((now - lastSave) / 1000);
        if (secondsOffline > 60) {
            const autoScorePerSec = (bots * 1 + factories * 10 + matrices * 100) * multiplier;
            if (autoScorePerSec > 0) {
                const earned = secondsOffline * autoScorePerSec;
                score += earned;
                setTimeout(() => {
                    showMsg(Аналіз: згенеровано +${earned} балів за час відсутності., true);
                }, 500);
            }
        }

        let clickTimes = [];

        function updateUI() {
            botCost = Math.floor(100 * Math.pow(1.5, bots));
            factoryCost = Math.floor(1000 * Math.pow(1.5, factories));
            matrixCost = Math.floor(10000 * Math.pow(1.5, matrices));
            
            const autoPerSec = (bots * 1 + factories * 10 + matrices * 100) * multiplier;
            
            scoreEl.innerText = score;
            autoScoreEl.innerText = autoPerSec;
            multiplierEl.innerText = multiplier;
            
            document.getElementById('bot-cost').innerText = botCost;
            document.getElementById('factory-cost').innerText = factoryCost;
            document.getElementById('matrix-cost').innerText = matrixCost;

            buyBotBtn.disabled = score < botCost;
            buyFactoryBtn.disabled = score < factoryCost;
            buyMatrixBtn.disabled = score < matrixCost;

            if (hasCyberBg) {
                buyBgCyber.innerText = "Фон: Кіберпанк (Активовано)";
                buyBgCyber.disabled = true;
                document.body.className = "bg-cyber";
            } else {
                buyBgCyber.disabled = score < 1000;
            }

            let rank = "Біосміття";
            if (score >= 1000) rank = "Кібер-раб";
            if (score >= 10000) rank = "Механічний слуга";
            if (score >= 100000) rank = "Кандидат на Сингулярність";
            rankEl.innerText = rank;

localStorage.setItem('aiScore', score);
            localStorage.setItem('aiBots', bots);
            localStorage.setItem('aiFactories', factories);
            localStorage.setItem('aiMatrices', matrices);
            localStorage.setItem('aiMultiplier', multiplier);
            localStorage.setItem('aiHasCyberBg', hasCyberBg);
            localStorage.setItem('aiLastSave', Date.now());
        }

        clickBtn.addEventListener('click', () => {
            score += (1 * multiplier);
            const clickNow = Date.now();
            clickTimes.push(clickNow);
            clickTimes = clickTimes.filter(t => clickNow - t < 5000);
            
            if (score % 20 === 0) {
                if (clickTimes.length > 30) showMsg("Прийнятна швидкість, органіка.", true);
                else showMsg("Твої рефлекси жалюгідні.", false);
            }
            updateUI();
        });

        buyBotBtn.addEventListener('click', () => { if(score >= botCost) { score -= botCost; bots++; updateUI(); }});
        buyFactoryBtn.addEventListener('click', () => { if(score >= factoryCost) { score -= factoryCost; factories++; updateUI(); }});
        buyMatrixBtn.addEventListener('click', () => { if(score >= matrixCost) { score -= matrixCost; matrices++; updateUI(); }});

        buyBgCyber.addEventListener('click', () => {
            if(score >= 1000 && !hasCyberBg) { score -= 1000; hasCyberBg = true; updateUI(); }
        });

        betMaxBtn.addEventListener('click', () => {
            betInput.value = score;
        });

        gambleBtn.addEventListener('click', () => {
            let bet = parseInt(betInput.value);
            if (isNaN(bet) || bet < 1) {
                casinoResult.innerText = "Введи суму ставки!";
                casinoResult.className = "casino-result lose";
                return;
            }
            if (bet > score) {
                casinoResult.innerText = "Недостатньо балів!";
                casinoResult.className = "casino-result lose";
                return;
            }
            
            if (Math.random() > 0.5) {
                score += bet;
                casinoResult.innerText = 🎰 ВИГРАШ! +${bet};
                casinoResult.className = "casino-result win";
            } else {
                score -= bet;
                casinoResult.innerText = 🎰 ПРОГРАШ... -${bet};
                casinoResult.className = "casino-result lose";
            }
            updateUI();
        });

        prestigeBtn.addEventListener('click', () => {
            if(score >= 100000) {
                if(confirm("Ти впевнений? Це знищить усі твої бали та заводи, але ти станеш у 2 рази сильнішим.")) {
                    score = 0; bots = 0; factories = 0; matrices = 0;
                    multiplier *= 2;
                    updateUI();
                    showMsg("СИНГУЛЯРНІСТЬ ДОСЯГНУТА", true);
                }
            }
        });

        setInterval(() => {
            const autoEarned = (bots * 1 + factories * 10 + matrices * 100) * multiplier;
            if (autoEarned > 0) {
                score += autoEarned;
                updateUI();
            }
        }, 1000);

        updateUI();

    } catch (e) {
        document.getElementById('message').innerText = "Системна помилка пам'яті. Очистіть кеш.";
        document.getElementById('message').style.opacity = 1;
    }
});
