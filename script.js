let currentPlayer = 'X';
let playerXName = '';
let playerOName = '';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let games = [];
let startTime;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    playerXName = document.getElementById('playerXName').value;
    playerOName = document.getElementById('playerOName').value;

    if (!playerXName || !playerOName) {
        alert("Please enter names for both players.");
        return;
    }

    gameActive = true;
    startTime = new Date();
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('tic-tac-toe-board').style.display = 'flex';
    document.getElementById('game-history').style.display = 'block';
    updatePlayerTurnDisplay();
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }
    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'tie';
    }
    return null;
}

function makeMove(cellIndex) {
    if (!gameActive) return;

    if (gameBoard[cellIndex]) {
        alert("This cell is already occupied.");
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    document.querySelectorAll('.cell')[cellIndex].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        let winnerName, gameStatus;
        if (winner === 'tie') {
            winnerName = 'Draw';
            gameStatus = 'Complete';
        } else {
            winnerName = winner === 'X' ? playerXName : playerOName;
            gameStatus = 'Complete';
        }
        const endTime = new Date();
        const timeTaken = Math.floor((endTime - startTime) / 1000); // Time taken in seconds
        games.push({ 
            gameNumber: games.length + 1,
            gameStatus,
            winnerName,
            timeTaken
        });
        updateGameHistory();
        if (winner !== 'tie') {
            alert(`${winnerName} wins!`);
        } else {
            alert("It's a tie!");
        }
        gameActive = false;
        startTime=new Date();
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurnDisplay();
    }
}

function updatePlayerTurnDisplay() {
    const playerTurnElement = document.getElementById('player-turn');
    const currentPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
    playerTurnElement.textContent = `${currentPlayerName}'s Turn`;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });

    updatePlayerTurnDisplay();
}

function updateGameHistory() {
    const gameHistoryElement = document.getElementById('game-history');
    gameHistoryElement.innerHTML = '';
    const gameHeaderRow = document.createElement('div');
    gameHeaderRow.classList.add('game-header');
    gameHeaderRow.classList.add('game-header-row');
    gameHeaderRow.innerHTML = `
            <div class="game-number">Game #</div>
            <div class="game-status">Game Status</div>
            <div class="winner-name">Winner</div>
            <div class="time-taken">Time Taken</div>
        `;
        gameHistoryElement.appendChild(gameHeaderRow); 
    games.forEach(game => {
        const gameRow = document.createElement('div');
        gameRow.classList.add('game-row');
        gameRow.innerHTML = `
            <div class="game-number">Game #${game.gameNumber}</div>
            <div class="game-status">${game.gameStatus}</div>
            <div class="winner-name">${game.winnerName}</div>
            <div class="time-taken">${game.timeTaken} seconds</div>
        `;
        gameHistoryElement.appendChild(gameRow);
    });
}
