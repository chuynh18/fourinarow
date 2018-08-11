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
    }
}

const reset = function() {
    gameBoard.reset();
    turnObj.reset();
}

const renderGame = function() {
    for (let i = 0; i < gameBoard.board.length; i++) {
        for (let j = 0; j < gameBoard.board[i].length; j++) {
            if (gameBoard.board[i][j] === 1) {
                document.getElementById(`${i}-${j}`).classList.add("p1");
            } else if (gameBoard.board[i][j] === 2) {
                document.getElementById(`${i}-${j}`).classList.add("p2");
            }
        }
    }
}

// ========== attach event handlers ==========

const gameColumns = document.getElementsByClassName("game-column");

for (let i = 0; i < gameColumns.length; i++) {
    gameColumns[i].addEventListener("click", function(event) {
        if (turnObj.turn !== 0) {
            if (event.target.classList.contains("circle-cell")) {
                console.log(event.target.parentElement.parentElement.id);
                gameBoard.play(event.target.parentElement.parentElement.id);
                renderGame();
            } else if (event.target.classList.contains("game-cell")) {
                console.log(event.target.parentElement.id);
                gameBoard.play(event.target.parentElement.id);
                renderGame();
            } else if (event.target.classList.contains("game-column")) {
                console.log(event.target.id);
                gameBoard.play(event.target.id);
                renderGame();
            }
        } else {
            console.log("error:  developer C is a nooblord and forgot to start the game");
        }
    });
}