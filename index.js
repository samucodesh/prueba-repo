// Game configuration
const GAME_CONFIG = {
    PLAYERS: {
        X: 'X',
        O: 'O'
    },
    BOARD_SIZE: 9,
    WINNING_COMBINATIONS: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ],
    CELL_CLASSES: {
        X: 'x',
        O: 'o',
        WINNING: 'winning-cell'
    }
};

class TicTacToe {
    constructor() {
        this.initializeElements();
        this.initializeGame();
        this.addEventListeners();
    }

    initializeElements() {
        this.board = document.getElementById('board');
        this.cells = document.querySelectorAll('.cell');
        this.status = document.getElementById('status');
        this.restartButton = document.getElementById('restart-button');
    }

    initializeGame() {
        this.currentPlayer = GAME_CONFIG.PLAYERS.X;
        this.gameActive = true;
        this.gameState = Array(GAME_CONFIG.BOARD_SIZE).fill('');
        this.updateStatus();
    }

    addEventListeners() {
        this.cells.forEach(cell => 
            cell.addEventListener('click', (e) => this.handleCellClick(e))
        );
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (!this.isValidMove(clickedCellIndex)) return;

        this.makeMove(clickedCellIndex, clickedCell);
        this.checkGameResult();
        
        if (this.gameActive) {
            this.switchPlayer();
            this.updateStatus();
        }
    }

    isValidMove(index) {
        return this.gameState[index] === '' && this.gameActive;
    }

    makeMove(index, cell) {
        this.gameState[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(GAME_CONFIG.CELL_CLASSES[this.currentPlayer]);
    }

    checkGameResult() {
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkTie()) {
            this.handleTie();
        }
    }

    checkWin() {
        return GAME_CONFIG.WINNING_COMBINATIONS.some(combination => {
            const [a, b, c] = combination;
            return this.gameState[a] !== '' &&
                   this.gameState[a] === this.gameState[b] &&
                   this.gameState[a] === this.gameState[c];
        });
    }

    checkTie() {
        return !this.gameState.includes('');
    }

    handleWin() {
        this.status.textContent = `Player ${this.currentPlayer} wins!`;
        this.gameActive = false;
        this.highlightWinningCells();
    }

    handleTie() {
        this.status.textContent = "It's a tie!";
        this.gameActive = false;
    }

    highlightWinningCells() {
        const winningCombination = GAME_CONFIG.WINNING_COMBINATIONS.find(combination => {
            const [a, b, c] = combination;
            return this.gameState[a] !== '' &&
                   this.gameState[a] === this.gameState[b] &&
                   this.gameState[a] === this.gameState[c];
        });

        if (winningCombination) {
            winningCombination.forEach(index => {
                this.cells[index].classList.add(GAME_CONFIG.CELL_CLASSES.WINNING);
            });
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === GAME_CONFIG.PLAYERS.X 
            ? GAME_CONFIG.PLAYERS.O 
            : GAME_CONFIG.PLAYERS.X;
    }

    updateStatus() {
        this.status.textContent = `Player ${this.currentPlayer}'s turn`;
    }

    restartGame() {
        this.initializeGame();
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove(
                GAME_CONFIG.CELL_CLASSES.X,
                GAME_CONFIG.CELL_CLASSES.O,
                GAME_CONFIG.CELL_CLASSES.WINNING
            );
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
