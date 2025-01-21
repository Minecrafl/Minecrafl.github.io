const grid = document.querySelector('.grid-container');
const gridCells = document.querySelectorAll('.grid-cell');
const restartButton = document.querySelector('.restart-button');
const gameMessage = document.querySelector('.game-message p');

// 自定义字符串映射
const customStrings = {
    2: "A",
    4: "B",
    8: "C",
    16: "D",
    32: "E",
    64: "F",
    128: "G",
    256: "H",
    512: "I",
    1024: "J",
    2048: "K"
};

let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function addRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.row][randomCell.col] = Math.random() > 0.9 ? 4 : 2;
        updateBoard();
    }
}

function updateBoard() {
    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const value = board[row][col];
        cell.textContent = value ? customStrings[value] : '';
        cell.className = `grid-cell tile-${value}`;
    });
}

function moveTiles(direction) {
    // Implement tile movement logic here
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        moveTiles('up');
    } else if (e.key === 'ArrowDown') {
        moveTiles('down');
    } else if (e.key === 'ArrowLeft') {
        moveTiles('left');
    } else if (e.key === 'ArrowRight') {
        moveTiles('right');
    }
});

restartButton.addEventListener('click', () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    addRandomTile();
    addRandomTile();
    updateBoard();
    gameMessage.textContent = '';
});

addRandomTile();
addRandomTile();
updateBoard();
