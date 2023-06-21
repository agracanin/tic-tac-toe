const fields = document.querySelectorAll('.field');
const restartBtn = document.querySelector('#restart');
const status = document.querySelector('#player-status');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

restartBtn.addEventListener('click', restartGame);

function initializeGame() {
    fields.forEach(field => field.addEventListener("click", fieldClicked));
}

function fieldClicked() {
    const fieldIndex = this.getAttribute("data-set");
    running = true;
    updateField(this, fieldIndex);
}

function updateField(cell, index) {
    if (cell.innerText === "" && running === true) {
        cell.innerText = currentPlayer;
        options[index] = currentPlayer;
        changePlayer();
        checkWinner();
    }
    return;
}

function changePlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    status.innerText = `Player ${currentPlayer}'s turn.`;
}

function checkWinner() {

    if (!options.includes("")) {
        declareWinner("draw");
    }

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            declareWinner(options[a]);
            return;
        }
    }
    return null;
}

function declareWinner(winner) {

    if (winner === "draw") {
        status.innerText = "It's a draw!"
    } else {
        status.innerText = `Player ${winner} has won the game!`
    }

    running = false;
    fields.forEach(field => field.removeEventListener("click", fieldClicked));
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = false;
    fields.forEach(field => field.innerText = "");
    status.innerText = "X goes first! Click a cell to begin.";
    initializeGame()

}