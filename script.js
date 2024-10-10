var gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var currentTurn = 0;
var tileLife = [[], []];
var announcer;

document.addEventListener("DOMContentLoaded", (event) => {
    announcer = document.getElementById("announcer");
})

function renderGameBoard() {
    for (let index = 0; index < 9; index++) {
        let targetBlock = document.getElementById("box" + index);
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

document.addEventListener("keydown", (event) => {
    if (!isNaN(event.key)) {
        let position = Number(event.key) - 1;
        
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
        if (tileLife[currentTurn].length > 4) {
            gameBoard[tileLife[currentTurn][3]] = 1 + currentTurn + 2;
            gameBoard[tileLife[currentTurn].pop()] = 0;
        }

        gameBoard[position] = currentTurn + 1;

        if (currentTurn == 0) {
            currentTurn = 1;
        }
        else {
            currentTurn = 0;
        }

        renderGameBoard();                
    }
})
