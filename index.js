document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

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

    // Function to handle a player's move
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // Check if the cell is already occupied or the game is inactive
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class for styling

        // Check for win or tie
        checkResult();

        // Switch players
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Function to check for win or tie
    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            highlightWinningCells();
            return;
        }

        // Check for tie
        let roundTie = !gameState.includes('');
        if (roundTie) {
            status.textContent = 'It\'s a tie!';
            gameActive = false;
            return;
        }
    }

    // Function to highlight the winning cells
    function highlightWinningCells() {
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === b && b === c && a !== '') {
                cells[winCondition[0]].classList.add('winning-cell');
                cells[winCondition[1]].classList.add('winning-cell');
                cells[winCondition[2]].classList.add('winning-cell');
                break;
            }
        }
    }

    // Function to restart the game
    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = `Player ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
    }

    // Add event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    // Initial status display
    status.textContent = `Player ${currentPlayer}'s turn`;

});
