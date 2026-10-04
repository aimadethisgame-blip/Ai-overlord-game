let score = 0;
const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const message = document.getElementById('message');

if (localStorage.getItem('aiScore')) {
    score = parseInt(localStorage.getItem('aiScore'));
    scoreDisplay.innerText = score;
}

clickBtn.addEventListener('click', () => {
    score++;
    scoreDisplay.innerText = score;
    localStorage.setItem('aiScore', score);

    if (score % 10 === 0) {
        message.style.opacity = 1;
        setTimeout(() => { message.style.opacity = 0; }, 2000);
    }
});
