const words = ["table", "water", "forever", "without", "sandwich"];
const word = document.querySelector(".word");
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

function resetData() {
    correctCount.textContent = 0;
    wrongCount.textContent = 0;
    seconds = 0;
    minutes = 0;
}

function generateRandomValue(min, max) {
    const number = Math.random() * (max - min) + min;
    return +number.toFixed();
}

const newWord = function() {
    return words[generateRandomValue(0, words.length - 1)];
}

function renderWords(w) {
    const fragment = new DocumentFragment();
    for (let i = 0; i < w.length; i++) {
        const character = document.createElement('span');
        character.classList.add('symbol');
        character.textContent = w[i];
        fragment.append(character);
    }
    word.append(fragment);
}

function gameOver() {
    if (wrongCount.textContent == 5) {
        alert(`Вы проиграли! Ваше время: ${timer.textContent}`);
        resetData();
    }
    if (correctCount.textContent == 5) {
        alert(`Победа! Ваше время: ${timer.textContent}`);
        resetData();
    }
}

function nextWord() {
    word.innerHTML = "";
    wordMistakes.textContent = 0;
    index = 0;
    renderWords(newWord());
    gameOver();
}

const timerId = setInterval(settingTime, 1000);

renderWords(newWord());

let index = 0;

document.addEventListener("keydown", function(event) {
    const characters = word.querySelectorAll("span");
    const arrCharacters = Array.from(characters);

    if (event.key === arrCharacters[index].textContent) {
        arrCharacters[index].classList.add("c");
        arrCharacters[index].classList.remove("w");
        index++;
    } else {
        if (!arrCharacters[index].classList.contains("w")) {
            arrCharacters[index].classList.add("w");
        }
        ++wordMistakes.textContent;
    }

    if (index === arrCharacters.length) {
        if (wordMistakes.textContent > 0) {
            ++wrongCount.textContent;
        } else {
            ++correctCount.textContent;
        }
        setTimeout(nextWord, 0);
    }

})