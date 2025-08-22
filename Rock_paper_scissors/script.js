// DOM Elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundCounterEl = document.getElementById('round-counter');
const choiceButtons = document.querySelectorAll('.choice-btn');
const playerChoiceIconEl = document.getElementById('player-choice-icon');
const computerChoiceIconEl = document.getElementById('computer-choice-icon');
const gameMessageEl = document.getElementById('game-message');
const resetButton = document.getElementById('reset-game-btn');

// Game State
let playerScore = 0;
let computerScore = 0;
let round = 1;
const totalRounds = 5;

// Mappings for choices to icons
const choiceIcons = {
    rock: 'https://shorturl.at/5bJ5A',
    paper: 'https://img.icons8.com/plasticine/100/paper.png',
    scissors: 'https://shorturl.at/8FxtA'
};

/**
 * Generates a random choice for the computer.
 * @returns {string} The computer's choice ('rock', 'paper', or 'scissors').
 */
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

/**
 * Determines the winner of a single round.
 * @param {string} playerChoice The player's choice.
 * @param {string} computerChoice The computer's choice.
 * @returns {string} The result of the round ('win', 'lose', or 'draw').
 */
function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

/**
 * Updates the UI with the latest scores and choices.
 * @param {string} playerChoice The player's choice.
 * @param {string} computerChoice The computer's choice.
 * @param {string} result The result of the round.
 */
function updateUI(playerChoice, computerChoice, result) {
    // Update choice icons
    playerChoiceIconEl.innerHTML = `<img src="${choiceIcons[playerChoice]}" alt="${playerChoice}">`;
    computerChoiceIconEl.innerHTML = `<img src="${choiceIcons[computerChoice]}" alt="${computerChoice}">`;

    // Update score and message based on result
    if (result === 'win') {
        playerScore++;
        gameMessageEl.textContent = 'You win this round!';
    } else if (result === 'lose') {
        computerScore++;
        gameMessageEl.textContent = 'You lose this round.';
    } else {
        gameMessageEl.textContent = "It's a draw!";
    }

    // Update score displays
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

/**
 * Checks if the game is over and displays the final result.
 */
function checkGameOver() {
    if (round > totalRounds) {
        let finalMessage = '';
        if (playerScore > computerScore) {
            finalMessage = 'Game Over! You win the series!';
        } else if (computerScore > playerScore) {
            finalMessage = 'Game Over! The computer wins the series.';
        } else {
            finalMessage = "Game Over! It's a tie!";
        }
        gameMessageEl.textContent = finalMessage;

        // Disable choice buttons after the game ends
        choiceButtons.forEach(button => {
            button.style.pointerEvents = 'none';
        });
    }
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    
    // Reset UI elements
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    roundCounterEl.textContent = `Round ${round}/${totalRounds}`;
    playerChoiceIconEl.innerHTML = '?';
    computerChoiceIconEl.innerHTML = '?';
    gameMessageEl.textContent = 'Make your choice!';
    
    // Re-enable choice buttons
    choiceButtons.forEach(button => {
        button.style.pointerEvents = 'auto';
    });
}

// Event Listeners
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (round <= totalRounds) {
            const playerChoice = button.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            const result = playRound(playerChoice, computerChoice);
            
            updateUI(playerChoice, computerChoice, result);
            
            round++;
            roundCounterEl.textContent = `Round ${round}/${totalRounds}`;
            checkGameOver();
        }
    });
});

resetButton.addEventListener('click', resetGame);