document.addEventListener("DOMContentLoaded", function () {
  const pathGrid = document.querySelector(".path-grid");

  // Corrected Ludo Path (52-cell loop)
  const pathCells = [
    // Bottom row (left to right)
    { row: 7, col: 1 },
    { row: 7, col: 2 },
    { row: 7, col: 3 },
    { row: 7, col: 4 },
    { row: 7, col: 5 },
    { row: 7, col: 6 },
    { row: 7, col: 7 },
    { row: 7, col: 8 },
    { row: 7, col: 9 },
    { row: 7, col: 10 },
    { row: 7, col: 11 },
    { row: 7, col: 12 },
    { row: 7, col: 13 },
    { row: 7, col: 14 },
    { row: 7, col: 15 },

    // Right column (bottom to top)
    { row: 15, col: 7 },
    { row: 14, col: 7 },
    { row: 13, col: 7 },
    { row: 12, col: 7 },
    { row: 11, col: 7 },
    { row: 10, col: 7 },
    { row: 9, col: 7 },
    { row: 8, col: 7 },
    { row: 7, col: 7 },
    { row: 6, col: 7 },
    { row: 5, col: 7 },
    { row: 4, col: 7 },
    { row: 3, col: 7 },
    { row: 2, col: 7 },
    { row: 1, col: 7 },

    // Top row (right to left)
    { row: 9, col: 15 },
    { row: 9, col: 14 },
    { row: 9, col: 13 },
    { row: 9, col: 12 },
    { row: 9, col: 11 },
    { row: 9, col: 10 },
    { row: 9, col: 9 },
    { row: 9, col: 8 },
    { row: 9, col: 7 },
    { row: 9, col: 6 },
    { row: 9, col: 5 },
    { row: 9, col: 4 },
    { row: 9, col: 3 },
    { row: 9, col: 2 },
    { row: 9, col: 1 },

    // Left column (top to bottom)
    { row: 1, col: 9 },
    { row: 2, col: 9 },
    { row: 3, col: 9 },
    { row: 4, col: 9 },
    { row: 5, col: 9 },
    { row: 6, col: 9 },
    { row: 7, col: 9 },
    { row: 8, col: 9 },
    { row: 9, col: 9 },
    { row: 10, col: 9 },
    { row: 11, col: 9 },
    { row: 12, col: 9 },
    { row: 13, col: 9 },
    { row: 14, col: 9 },
    { row: 15, col: 9 },
  ];

  // Home Lanes (Each player's final 6 cells leading to the center)
  const homeLanes = {
    red: [
      { row: 8, col: 1 },
      { row: 8, col: 2 },
      { row: 8, col: 3 },
      { row: 8, col: 4 },
      { row: 8, col: 5 },
      { row: 8, col: 6 },
    ],
    blue: [
      { row: 1, col: 8 },
      { row: 2, col: 8 },
      { row: 3, col: 8 },
      { row: 4, col: 8 },
      { row: 5, col: 8 },
      { row: 6, col: 8 },
    ],
    green: [
      { row: 8, col: 15 },
      { row: 8, col: 14 },
      { row: 8, col: 13 },
      { row: 8, col: 12 },
      { row: 8, col: 11 },
      { row: 8, col: 10 },
    ],
    yellow: [
      { row: 15, col: 8 },
      { row: 14, col: 8 },
      { row: 13, col: 8 },
      { row: 12, col: 8 },
      { row: 11, col: 8 },
      { row: 10, col: 8 },
    ],
  };

  // Create path cells
  pathCells.forEach(({ row, col }) => {
    const cell = document.createElement("div");
    cell.classList.add("cell", "path");
    cell.style.gridRowStart = row;
    cell.style.gridColumnStart = col;
    pathGrid.appendChild(cell);
  });

  // Create home lane cells
  Object.entries(homeLanes).forEach(([color, cells]) => {
    cells.forEach(({ row, col }) => {
      const cell = document.createElement("div");
      cell.classList.add("cell", "home-lane", color);
      cell.style.gridRowStart = row;
      cell.style.gridColumnStart = col;
      pathGrid.appendChild(cell);
    });
  });

  // Dice Roll Animation
  const dice = document.getElementById("dice");
  dice.addEventListener("click", function () {
    dice.classList.add("roll");
    setTimeout(() => {
      dice.classList.remove("roll");
    }, 500);
  });
});

const players = ["red", "blue", "green", "yellow"];
let currentPlayerIndex = 0;
let diceValue = 1;
const pieces = {
    red: [{ position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }],
    blue: [{ position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }],
    green: [{ position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }],
    yellow: [{ position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }, { position: -1, element: null }]
};

document.addEventListener("DOMContentLoaded", function () {
    const pathGrid = document.querySelector(".path-grid");

    // Create and place pieces inside home areas
    Object.entries(pieces).forEach(([color, pieceArray]) => {
        pieceArray.forEach((piece, index) => {
            const pieceElement = document.createElement("div");
            pieceElement.classList.add("piece", `${color}-piece`);
            pieceElement.dataset.color = color;
            pieceElement.dataset.index = index;
            document.querySelector(`.${color}-home .circle-container`).appendChild(pieceElement);
            piece.element = pieceElement;
            pieceElement.addEventListener("click", movePiece);
        });
    });

    // Dice Roll Handling
    document.getElementById("dice").addEventListener("click", function () {
        diceValue = Math.floor(Math.random() * 6) + 1;
        this.innerText = diceValue;

        if (diceValue !== 6) {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        }
        console.log(`Player ${players[currentPlayerIndex]}'s turn`);
    });
});

// Move Piece on Click
function movePiece(player, pieceIndex) {
    let piece = pieces[player][pieceIndex];

    // If piece is still in home
    if (piece.position === -1) {
        if (diceValue === 6) {
            piece.position = 0; // Move to the start position
            console.log(`${player} moved piece ${pieceIndex} out of home!`);
        } else {
            console.log(`${player} needs a 6 to start.`);
            return;
        }
    } else {
        piece.position += diceValue; // Move forward normally
    }

    checkCapture(player, pieceIndex);
    checkWin(player);
}


// Update Piece Position on Board
function updatePiecePosition(piece, pieceElement) {
    if (piece.position >= pathCells.length) {
        console.log(`${pieceElement.dataset.color} piece reached home!`);
        return;
    }

    const { row, col } = pathCells[piece.position];
    pieceElement.style.gridRowStart = row;
    pieceElement.style.gridColumnStart = col;
    document.querySelector(".path-grid").appendChild(pieceElement);
}

// Check Capture
function checkCapture(player, pieceIndex) {
    const newPosition = pieces[player][pieceIndex].position;

    players.forEach(opponent => {
        if (opponent !== player) {
            pieces[opponent].forEach((opponentPiece, index) => {
                if (opponentPiece.position === newPosition && !isSafeZone(newPosition)) {
                    opponentPiece.position = -1;
                    console.log(`${player} captured ${opponent}'s piece!`);
                }
            });
        }
    });
}

// Check Safe Zones
function isSafeZone(position) {
    const safeZones = [1, 9, 14, 22, 27, 35, 40, 48];
    return safeZones.includes(position);
}

// Check Win Condition
function checkWin(player) {
    if (pieces[player].every(piece => piece.position >= 56)) {
        console.log(`${player} WINS THE GAME!`);
    }
}
document.getElementById("dice").addEventListener("click", function () {
    diceValue = Math.floor(Math.random() * 6) + 1;
    this.innerText = diceValue;

    if (diceValue !== 6) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    }

    updateTurnIndicator();
    console.log(`Player ${players[currentPlayerIndex]}'s turn`);
});

// Update the Turn Indicator
function updateTurnIndicator() {
    const currentPlayer = players[currentPlayerIndex];
    const turnText = document.getElementById("current-player");
    
    turnText.innerText = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    turnText.style.color = currentPlayer; // Set text color to match player
}
