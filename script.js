let word = "spanzuratoare";
let lettersCount = word.length;
let remainingLetters = document.getElementById("remainingLetters");
let replacementWord = "";
let playArea = document.getElementById("wordArea");
let userInput;
let numberOfLives = 7;
let remainingLives = document.getElementById("remainingLives");
let EOGMessage = document.getElementById('eog_message');

function displayGame() {
    for (let i = 0; i <lettersCount; ++i) {
        replacementWord += "_";
    }
    playArea.textContent = replacementWord + " ";
    remainingLetters.textContent = lettersCount;
    remainingLives.textContent = numberOfLives;
}

function readUserInput() {
    userInput = document.getElementById("userInput").value;
    let indexOfInput = word.indexOf(userInput);
    if (indexOfInput === -1) {
        decreaseLives();
    } else {
        while (indexOfInput !== -1) {
            --lettersCount;
            checkLettersNo();
            word = replaceAt(word, indexOfInput, "*");
            replacementWord = replaceAt(replacementWord, indexOfInput, userInput);
            indexOfInput = word.indexOf(userInput, indexOfInput + 1);
        }
    }
    displayNewWord();
    refreshInputField();
}


function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + 1);
}

function displayNewWord() {
    playArea.textContent = replacementWord;
}

function refreshInputField () {
    document.getElementById("userInput").value = ""; 
}

function checkLettersNo() {
    if (lettersCount === 0) {
        displayPlayerWon();
    }
    document.getElementById("remainingLetters").textContent = lettersCount;
}

function decreaseLives() {
    if (numberOfLives > 1) {
        --numberOfLives;
        remainingLives.textContent = numberOfLives;
    } else {
        displayEOLives();
        remainingLives.textContent = "0";
    }

}
function displayEOLives() {
    let EOGMessage = document.getElementById('eog_message');
    EOGMessage.textContent = "Player is hanged!"
    EOGMessage.style.display = "block";
    replacementWord = word;
}

function displayPlayerWon() {
    let EOGMessage = document.getElementById('eog_message');
    EOGMessage.textContent = "Congratulations, you won!"
    EOGMessage.style.display = "block";
}

window.addEventListener('load', function() {
    displayGame();
});
document.getElementById("button-addon1").addEventListener('click', function() {
    readUserInput();
});
