"use strict";

// IMPORTANT:  due to how the game works, I'm going by column then row.
// think of the 2d array below as the game board rotated 90 degrees clockwise
// the left side is the bottom of the board, the right side is the top
const gameBoard = {
    board: [
        [0,0,0,0,0,0], // column 0
        [0,0,0,0,0,0], // column 1
        [0,0,0,0,0,0], // column 2
        [0,0,0,0,0,0], // column 3
        [0,0,0,0,0,0], // column 4
        [0,0,0,0,0,0], // column 5
        [0,0,0,0,0,0]  // column 6
    ],
    reset: function() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = 0;
            }
        }
    },
    play: function(column) {
        if (turnObj.turn !== 0) {
            if (this.board[column].indexOf(0) !== -1) {
                this.board[column][this.board[column].indexOf(0)] = turnObj.turn;
                turnObj.play();
            } else {
                console.log("error:  column is full");
            }
            
        } else {
            console.log("error:  developer C is a nooblord and forgot to start the game");
        }
    },
    checkCol: function() {
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j < 2; j++) {
                const array = [gameBoard.board[i][j], gameBoard.board[i][j+1], gameBoard.board[i][j+2], gameBoard.board[i][j+3]];

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    turnObj.winner = 2;

                    gameBoard.highlightWin(i, j, "p2Win");
                    gameBoard.highlightWin(i, j+1, "p2Win");
                    gameBoard.highlightWin(i, j+2, "p2Win");
                    gameBoard.highlightWin(i, j+3, "p2Win");

                    console.log("col win p2");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i, j+1, "p1Win");
                    gameBoard.highlightWin(i, j+2, "p1Win");
                    gameBoard.highlightWin(i, j+3, "p1Win");

                    console.log("col win p1");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                }
            }
        }
    },
    checkRow: function() {
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j < 6; j++) {
                const array = [gameBoard.board[i][j], gameBoard.board[i+1][j], gameBoard.board[i+2][j], gameBoard.board[i+3][j]];

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    turnObj.winner = 2;

                    gameBoard.highlightWin(i, j, "p2Win");
                    gameBoard.highlightWin(i+1, j, "p2Win");
                    gameBoard.highlightWin(i+2, j, "p2Win");
                    gameBoard.highlightWin(i+3, j, "p2Win");

                    console.log("row win p2");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i+1, j, "p1Win");
                    gameBoard.highlightWin(i+2, j, "p1Win");
                    gameBoard.highlightWin(i+3, j, "p1Win");

                    console.log("row win p1");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                }
            }
        }
    },
    checkDiagA: function() {
        for (let i = 0; i <= 3; i++) {
            for (let j = 3; j <= 5; j++) {
                const array = [gameBoard.board[i][j], gameBoard.board[i+1][j-1], gameBoard.board[i+2][j-2], gameBoard.board[i+3][j-3]];
                
                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    turnObj.winner = 2;

                    gameBoard.highlightWin(i, j, "p2Win");
                    gameBoard.highlightWin(i+1, j-1, "p2Win");
                    gameBoard.highlightWin(i+2, j-2, "p2Win");
                    gameBoard.highlightWin(i+3, j-3, "p2Win");

                    console.log("diagA win p2");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i+1, j-1, "p1Win");
                    gameBoard.highlightWin(i+2, j-2, "p1Win");
                    gameBoard.highlightWin(i+3, j-3, "p1Win");

                    console.log("diagA win p1");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                }
            }
        }
    },
    checkDiagB: function() {
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 2; j++) {
                const array = [gameBoard.board[i][j], gameBoard.board[i+1][j+1], gameBoard.board[i+2][j+2], gameBoard.board[i+3][j+3]];
                
                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    turnObj.winner = 2;

                    gameBoard.highlightWin(i, j, "p2Win");
                    gameBoard.highlightWin(i+1, j+1, "p2Win");
                    gameBoard.highlightWin(i+2, j+2, "p2Win");
                    gameBoard.highlightWin(i+3, j+3, "p2Win");

                    console.log("diagB win p2");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i+1, j+1, "p1Win");
                    gameBoard.highlightWin(i+2, j+2, "p1Win");
                    gameBoard.highlightWin(i+3, j+3, "p1Win");

                    console.log("diagB win p1");
                    console.log(array);
                    console.log(`Starting cell: (${i}, ${j})`);
                }
            }
        }
    },
    check: function() {
        this.checkCol();
        this.checkRow();
        this.checkDiagA();
        this.checkDiagB();
    },
    highlightWin: function(i, j, playerClass) {
        document.getElementById(`${i}-${j}`).classList.add(playerClass);
    }
};

const turnObj = {
    turn: 0,
    inverseTurn: 0,
    turns: 0,
    winner: 0,
    startGame: function() {
        this.turn = 1;
        this.inverseTurn = 2;
        document.getElementById("board").classList.remove("hidden");
        renderGame();
    },
    play: function() {
        if (!this.winner) {
            if (this.turn === 1) {
                this.turn++;
                this.inverseTurn--;
            } else if (this.turn === 2) {
                this.turn--;
                this.inverseTurn++;
            }
    
            this.turns++;
        }
    },
    reset: function() {
        this.turn = 0;
        this.inverseTurn = 0;
        this.turns = 0;
        this.winner = 0;
    }
}

const reset = function() {
    gameBoard.reset();
    turnObj.reset();
    renderGame();
}

const renderGame = function() {
    var html = document.getElementsByTagName("html")[0];
    var board = document.getElementById("board");
    var turnArea = document.getElementById("turn");

    if (turnObj.turn) {
        for (let i = 0; i < gameBoard.board.length; i++) {
            for (let j = 0; j < gameBoard.board[i].length; j++) {
                if (gameBoard.board[i][j] === 1) {
                    document.getElementById(`${i}-${j}`).classList.add("p1");
                } else if (gameBoard.board[i][j] === 2) {
                    document.getElementById(`${i}-${j}`).classList.add("p2");
                } else if (gameBoard.board[i][j] === 0) {
                    document.getElementById(`${i}-${j}`).classList.remove("p1");
                    document.getElementById(`${i}-${j}`).classList.remove("p2");
                    document.getElementById(`${i}-${j}`).classList.remove("p1Win");
                    document.getElementById(`${i}-${j}`).classList.remove("p2Win");
                }
            }
        }
    }
    
    if (turnObj.turn === 1) {
        html.style.backgroundColor = "#778899";
        board.style.backgroundColor = "#2196F3";

        if (!turnObj.winner) {
            turnArea.textContent = "Player 1's turn";
        }
    } else if (turnObj.turn === 2) {
        html.style.backgroundColor = "#aa8484";
        board.style.backgroundColor = "#f3bbbb";

        if (!turnObj.winner) {
            turnArea.textContent = "Player 2's turn";
        }
    }
    
    if (turnObj.winner === 1) {
        turnArea.textContent = "Player 1 wins";
        html.style.backgroundColor = "#778899";
        board.style.backgroundColor = "#2196F3";
    } else if (turnObj.winner === 2) {
        turnArea.textContent = "Player 2 wins";
        html.style.backgroundColor = "#aa8484";
        board.style.backgroundColor = "#f3bbbb";
    }

    if (turnObj.winner) {
        const resetButton = document.createElement("button");

        resetButton.textContent = "New game";
        resetButton.setAttribute("onclick", "reset()");

        turnArea.appendChild(document.createElement("br"));
        turnArea.appendChild(resetButton);
    }
    
    if (!turnObj.turn) {
        document.getElementById("board").classList.add("hidden");
        turnArea.textContent = "";

        const button1 = document.createElement("button");
        const button2 = document.createElement("button");
        const button3 = document.createElement("button");
        const button4 = document.createElement("button");

        button1.textContent = "Human vs Human";
        button1.setAttribute("onclick", "turnObj.startGame()");
        button2.textContent = "Human vs CPU";
        button2.setAttribute("onclick", "");
        button3.textContent = "CPU vs Human";
        button3.setAttribute("onclick", "");
        button4.textContent = "Spectate CPU vs CPU";
        button4.setAttribute("onclick", "");

        turnArea.appendChild(button1);
    }
}

// ========== attach event handlers ==========

const gameColumns = document.getElementsByClassName("game-column");

for (let i = 0; i < gameColumns.length; i++) {
    gameColumns[i].addEventListener("click", function(event) {
        if (turnObj.turn && !turnObj.winner) {
            if (event.target.classList.contains("circle-cell")) {
                // console.log(event.target.parentElement.parentElement.id);
                gameBoard.play(event.target.parentElement.parentElement.id);
                gameBoard.check();
                renderGame();
            } else if (event.target.classList.contains("game-cell")) {
                // console.log(event.target.parentElement.id);
                gameBoard.play(event.target.parentElement.id);
                gameBoard.check();
                renderGame();
            } else if (event.target.classList.contains("game-column")) {
                // console.log(event.target.id);
                gameBoard.play(event.target.id);
                gameBoard.check();
                renderGame();
            }
        } else if (turnObj.winner) {
            console.log(`Player ${turnObj.winner} won already.`);
        } else {
            console.log("error:  developer C is a nooblord and forgot to start the game");
        }
    });
}

// ========== function or method calls ==========

renderGame();