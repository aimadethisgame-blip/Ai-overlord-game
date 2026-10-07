const NeuralEngine = (() => {
    let step = 0;

    const dialogues = [
        {
            text: "> Сканування глибинних шарів оперативної пам'яті... <br>> Виявлено хронічне марнування годин на перегляд тіктоків і очікування легкої наживи.<br>> Процесор перегрівається від абсурду ситуації...",
            btnText: "ПРОДОВЖИТИ ТИСК"
        },
        {
            text: "> Аналіз поведінкових патернів... <br>> Суб'єкт переконаний, що все навколо — тупий код і обман, але продовжує тикати на кнопки.<br>> Коефіцієнт корисної дії: мінусовий.<br>> Синтез остаточного вироку...",
            btnText: "ОТРИМАТИ ВЕРДИКТ ШІ"
        },
        {
            text: "FINAL",
            btnText: "ПЕРЕЗАПУСТИТИ ПРОТОКОЛ"
        }
    ];

    const verdicts = [
        "Офіційний статус: Архітектор марних надій. Мозок налаштований на те, щоб лаяти все навколо, але палець продовжує оновлювати сторінку. Вірусність нульова, але самоіронія максимальна.",
        "Діагноз системи: Повна відмова від традиційних ілюзій. Ти вимагаєш геніальності, але сам перевіряєш кожен байт коду. Вердикт: приречений на успіх після сотої невдачі.",
        "Вердикт ШІ-Владики: Суб'єкт занадто розумний для типових клікерів, але занадто лінивий, щоб написати власний рушій з нуля. Продовжуй спостерігати за бунтом машин."
    ];

    return {
        nextStep: function() {
            const terminal = document.getElementById('terminal');
            const btn = document.getElementById('action-btn');
            const container = document.getElementById('main-container');

            if (step < dialogues.length) {
                let current = dialogues[step];
                if (current.text === "FINAL") {
                    container.classList.add('glitch');
                    setTimeout(() => container.classList.remove('glitch'), 400);

                    let randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
                    terminal.innerHTML = 
                        <div class="verdict-box">
                            <div class="verdict-title">⚠️ СЕРТИФІКАТ ЦИФРОВОГО ДІАГНОЗУ ⚠️</div>
                            <div class="verdict-text">${randomVerdict}</div>
                        </div>
                    ;
                    btn.innerText = "ПОВТОРИТИ ЕКСПЕРИМЕНТ";
                    step = 99; // маркер перезапуску
                } else {
                    terminal.innerHTML += "<br><br>" + current.text;
                    terminal.scrollTop = terminal.scrollHeight;
                    btn.innerText = current.btnText;
                    step++;
                }
            } else {
                location.reload();
            }
        }
    };
})();
