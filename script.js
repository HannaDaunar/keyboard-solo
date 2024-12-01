const words = ["table", "water", "forever", "without", "sandwich"];
const word = document.querySelector(".word");

function generateRandomValue(min, max) {
    const number = Math.random() * (max - min) + min;
    return +number.toFixed();
}
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const wordMistakes = document.querySelector(".word-mistakes");
const timer = document.querySelector("#timer");

let seconds = 0;
let minutes = 0;

function format(n) {
    if (n < 10) {
        return `0${n}`;
    } else {
        return n;
    }
}

function settingTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    timer.textContent = `${format(minutes)}:${format(seconds)}`;
}


const timerId = setInterval(settingTime, 1000);

function resetData() {
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    seconds = 0;
    minutes = 0;
}

function renderWords() {

    let newWord = words[generateRandomValue(0, words.length - 1)];

    const fragment = new DocumentFragment();
    for (let i = 0; i < newWord.length; i++) {
        const character = document.createElement('span');
        character.classList.add('symbol');
        character.textContent = newWord[i];
        fragment.append(character);
    }

    word.append(fragment);

    const characters = word.querySelectorAll("span");
    const arrCharacters = Array.from(characters);

    let index = 0;

    document.addEventListener("keydown", function(event) {

        if (event.key === newWord[index]) {
            arrCharacters[index].classList.add("c");
            arrCharacters[index].classList.remove("w");
            index++;

        } else {
            arrCharacters[index].classList.add("w");
            ++wordMistakes.textContent;
        }

        if (index === newWord.length) {
            word.innerHTML = "";
            wordMistakes.textContent = 0;
            renderWords();

            if (wordMistakes.textContent > 0) {
                ++wrongCount.textContent;
                if (wrongCount.textContent == 5) {
                    resetData();
                    alert(`Вы проиграли! Ваше время: ${timer.textContent}`);
                }

            } else {
                ++correctCount.textContent;
                if (correctCount.textContent == 5) {
                    resetData();
                    alert(`Победа! Ваше время: ${timer.textContent}`);
                }
            }

        }

    })

}

renderWords();