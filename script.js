var gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var currentTurn = 0;
var tileLife = [[], []];
var announcer;
var gameRunning = true;

document.addEventListener("DOMContentLoaded", (event) => {
    announcer = document.getElementById("announcer");
})

function checkWinningBoard(lastPlacedPiece) {
    let sanitizedBoard = gameBoard.slice(0);
    let hits = 0;
    sanitizedBoard[sanitizedBoard.indexOf(3)] = 1;
    sanitizedBoard[sanitizedBoard.indexOf(4)] = 2;

    // modulus of 5 give the starting column position
    hits = 0;

    for (let checkIndex = lastPlacedPiece % 5; checkIndex < 25; checkIndex += 5) {
        if (sanitizedBoard[checkIndex] == sanitizedBoard[lastPlacedPiece])
            hits += 1;
    }

    if (hits == 5) return true;

    // floor of division by 5 give starting row position
    hits = 0;
    let target = Math.floor(lastPlacedPiece / 5);

    for (let checkIndex = target; checkIndex < target + 5; checkIndex++) {
        if (sanitizedBoard[checkIndex] == sanitizedBoard[lastPlacedPiece])
            hits += 1;
    }

    if (hits == 5) return true;

    // modulus by 6 check if it is on the main diagonal
    hits = 0;
    
    if (lastPlacedPiece % 6 == 0) {
        for (let checkIndex = 0; checkIndex < 25; checkIndex += 6) {
            if (sanitizedBoard[checkIndex] == sanitizedBoard[lastPlacedPiece])
                hits += 1;
        }

        if (hits == 5) return true;
    }

    // modulus by 4 check if it is on the anti-diagonal
    hits = 0;
    
    if (lastPlacedPiece % 4 == 0 && lastPlacedPiece != 0 && lastPlacedPiece != 24) {
        for (let checkIndex = 4; checkIndex < 21; checkIndex += 4) {
            if (sanitizedBoard[checkIndex] == sanitizedBoard[lastPlacedPiece])
                hits += 1;
        }

        if (hits == 5) return true;
    }

    return false;
}

function renderGameBoard() {
    for (let index = 0; index < 25; index++) {
        let targetBlock = document.getElementById(index);
        switch (gameBoard[index]) {
            case 1:
                targetBlock.className = "playerOneHighlight";
                break;

            case 2:
                targetBlock.className = "playerTwoHighlight";
                break;

            case 3:
                targetBlock.className = "playerOneNextDisappear";
                break;

            case 4:
                targetBlock.className = "playerTwoNextDisappear";
                break;

            default:
                targetBlock.className = "";
                break;
        }
    }
}

function handleBoardClick() {
    if (!gameRunning) return;
    let position = event.target.id;

    // prevent duplicated entry
    if (gameBoard[position] != 0
        && tileLife[currentTurn][tileLife[currentTurn].length - 1] != position) {

        announcer.innerHTML = "Chosen position is occupied!";
        return;
    }

    // clear announcer
    announcer.innerHTML = "";

    // add corresponding entry
    tileLife[currentTurn].unshift(position);


    // update the gameboard
    if (tileLife[currentTurn].length > 8) {
        gameBoard[tileLife[currentTurn].pop()] = 0;
    }

    gameBoard[tileLife[currentTurn][7]] = 1 + currentTurn + 2;
    gameBoard[position] = currentTurn + 1;

    renderGameBoard();
    if (checkWinningBoard(position)) {
        gameRunning = false;
        announcer.innerHTML = "The winner is player " + (currentTurn + 1);
    }

    if (currentTurn == 0) {
        currentTurn = 1;
    }
    else {
        currentTurn = 0;
    }

}

