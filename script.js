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
    let hasMoved = false;

    // Helper function to merge tiles
    function mergeTiles(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] && arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                arr[i + 1] = 0;
                hasMoved = true;
            }
        }
    }

    // Helper function to slide tiles
    function slideTiles(arr) {
        return arr.filter(cell => cell).concat(arr.filter(cell => !cell));
    }

    if (direction === 'up') {
        for (let col = 0; col < 4; col++) {
            const column = [board[0][col], board[1][col], board[2][col], board[3][col]];
            mergeTiles(slideTiles(column));
            for (let row = 0; row < 4; row++) {
                board[row][col] = column[row];
            }
        }
    } else if (direction === 'down') {
        for (let col = 0; col < 4; col++) {
            const column = [board[3][col], board[2][col], board[1][col], board[0][col]];
            mergeTiles(slideTiles(column));
            for (let row = 0; row < 4; row++) {
                board[3 - row][col] = column[row];
            }
        }
    } else if (direction === 'left') {
        for (let row = 0; row < 4; row++) {
            const rowArr = board[row].slice();
            mergeTiles(slideTiles(rowArr));
            board[row] = rowArr;
        }
    } else if (direction === 'right') {
        for (let row = 0; row < 4; row++) {
            const rowArr = board[row].slice().reverse();
            mergeTiles(slideTiles(rowArr));
            board[row] = rowArr.reverse();
        }
    }

    if (hasMoved) {
        addRandomTile();
    }
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
