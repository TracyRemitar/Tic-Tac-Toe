let currentPlayer = 'X';
let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

//Click Button Function
function makeMove(tile) {
    if (tile.innerHTML === '' && checkWinner() === '') {
        tile.innerHTML = currentPlayer;
        const index = Array.from(tile.parentNode.children).indexOf(tile);
        const row = Math.floor(index / 3);
        const col = index % 3;
        gameBoard[row][col] = currentPlayer;
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        checkGameStatus();
    }
}

//Alert Message Function
function checkGameStatus() {
    const winner = checkWinner();
    if (winner !== '') {
        alert(winner + " is the winner!");
        markWinningLine(winner);
    } else if (isDraw()) {
        alert("The match is a draw!");
    }
}

//Check Winner Function
function checkWinner() {
    for (let i = 0; i < 3; i++) {
        // Check Row
        if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== '') {
            console.log(gameBoard[i][0]); // Checking for winning player
            return gameBoard[i][0]; // Return the winning player
        }
        // Check Column
        if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== '') {
            console.log(gameBoard[0][i]); // Checking for winning player
            return gameBoard[0][i]; // Return the winning player
        }
    }
    // Diagonals
    // TopLeft - BottomRight
    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== '') {
        console.log(gameBoard[0][0]); // Checking for winning player
        return gameBoard[0][0]; // Return the winning player
    }
    // TopRight - BottomLeft
    if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== '') {
        console.log(gameBoard[0][2]); // Checking for winning player
        return gameBoard[0][2]; // Return the winning player
    }
    return '';
}

//Draw function
function isDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

//Changing Background using Winning CLASS
function markWinningLine(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const tileA = document.getElementById(`cell-${a}`);
        const tileB = document.getElementById(`cell-${b}`);
        const tileC = document.getElementById(`cell-${c}`);

        if (gameBoard[Math.floor(a / 3)][a % 3] === player && 
            gameBoard[Math.floor(b / 3)][b % 3] === player && 
            gameBoard[Math.floor(c / 3)][c % 3] === player) {
            tileA.classList.add('winning');
            tileB.classList.add('winning');
            tileC.classList.add('winning');
            return;
        }
    }
}