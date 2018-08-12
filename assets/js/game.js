"use strict";

// VERY IMPORTANT:  Due to how the game works, I'm going by column then row.
// Think of the 2d array below as the game board rotated 90 degrees clockwise.
// The left side is the bottom of the board, and the right side is the top.
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
        if (!turnObj.winner) {
            if (turnObj.turn !== 0) {
                if (this.board[column].indexOf(0) !== -1) {
                    this.board[column][this.board[column].indexOf(0)] = turnObj.turn;
                    turnObj.play();
                    this.check();
                    turnObj.move(column);
                } else {
                    console.log("error:  column is full");
                }
            } else {
                console.log("error:  developer C is a nooblord and forgot to start the game");
            }

            if (turnObj.mode === 4) {
                setTimeout(function() {
                    play();
                }, 500);
            } else if (turnObj.mode === 2 && turnObj.turn === 2) {
                setTimeout(function() {
                    play();
                }, 500);
            } else if (turnObj.mode === 3 && turnObj.turn === 1) {
                setTimeout(function() {
                    play();
                }, 500);
            }
        } else {
            console.log("error:  someone already won");
        }
    },
    undo: function(rerender) {
        const lastPlay = turnObj.moveList[turnObj.moveList.length - 1];

        if (lastPlay) {
            if (gameBoard.board[lastPlay].indexOf(0) === -1) {
                gameBoard.board[lastPlay][gameBoard.board[lastPlay].length - 1] = 0;
            } else {
                gameBoard.board[lastPlay][gameBoard.board[lastPlay].indexOf(0) - 1] = 0;
            }
    
            turnObj.undo(rerender);
        } else {
            console.log("error:  no turns to undo")
        }
        
    },
    checkCol: function() {
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= 2; j++) {
                const array = [gameBoard.board[i][j], gameBoard.board[i][j+1], gameBoard.board[i][j+2], gameBoard.board[i][j+3]];

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    turnObj.winner = 2;

                    gameBoard.highlightWin(i, j, "p2Win");
                    gameBoard.highlightWin(i, j+1, "p2Win");
                    gameBoard.highlightWin(i, j+2, "p2Win");
                    gameBoard.highlightWin(i, j+3, "p2Win");

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("col win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                    
                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i, j+1, "p1Win");
                    gameBoard.highlightWin(i, j+2, "p1Win");
                    gameBoard.highlightWin(i, j+3, "p1Win");

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("col win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                }
            }
        }
    },
    checkRow: function() {
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 5; j++) {
                const array = [gameBoard.board[i][j], gameBoard.board[i+1][j], gameBoard.board[i+2][j], gameBoard.board[i+3][j]];

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    turnObj.winner = 2;

                    gameBoard.highlightWin(i, j, "p2Win");
                    gameBoard.highlightWin(i+1, j, "p2Win");
                    gameBoard.highlightWin(i+2, j, "p2Win");
                    gameBoard.highlightWin(i+3, j, "p2Win");

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("row win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }

                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i+1, j, "p1Win");
                    gameBoard.highlightWin(i+2, j, "p1Win");
                    gameBoard.highlightWin(i+3, j, "p1Win");

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("row win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
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

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagA win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }

                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i+1, j-1, "p1Win");
                    gameBoard.highlightWin(i+2, j-2, "p1Win");
                    gameBoard.highlightWin(i+3, j-3, "p1Win");

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagA win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
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

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagB win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }

                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    turnObj.winner = 1;

                    gameBoard.highlightWin(i, j, "p1Win");
                    gameBoard.highlightWin(i+1, j+1, "p1Win");
                    gameBoard.highlightWin(i+2, j+2, "p1Win");
                    gameBoard.highlightWin(i+3, j+3, "p1Win");

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagB win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
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
    moveList: [],
    mode: 0,
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

            if (this.winner === 0 && this.turns === 42) {
                this.winner = -1;
            }
        }
    },
    reset: function() {
        this.turn = 0;
        this.inverseTurn = 0;
        this.turns = 0;
        this.winner = 0;
        this.moveList = [];
        this.mode = 0;
    },
    move: function(play) {
        this.moveList[this.moveList.length] = play;
    },
    undo: function(rerender) {
        if (!this.winner) {
            if (this.turn === 1) {
                this.turn++;
                this.inverseTurn--;
            } else if (this.turn === 2) {
                this.turn--;
                this.inverseTurn++;
            }

            this.turns--;
        } else if (this.winner) {
            if (this.turn === 1) {
                this.turn++;
                this.inverseTurn--;
            } else if (this.turn === 2) {
                this.turn--;
                this.inverseTurn++;
            }

            this.turns--;

            this.winner = 0;
        }

        this.moveList.length -= 1;

        if (rerender) {
            renderGame();
        }
        
    }
}

const reset = function() {
    gameBoard.reset();
    turnObj.reset();
    renderGame();
}

// renders the page according to game state (player turn, tied game, player won, etc.)
const renderGame = function() {
    var html = document.getElementsByTagName("html")[0];
    var board = document.getElementById("board");
    var turnArea = document.getElementById("turn");

    var undoButton = document.createElement("button");
    undoButton.textContent = "Undo last move";
    if (turnObj.mode === 1) {
        undoButton.setAttribute("onclick", "gameBoard.undo(true);");
    } else {
        undoButton.setAttribute("onclick", "gameBoard.undo(true);gameBoard.undo(true);");
    }
    
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

    if (turnObj.mode === 4) {
        modifyEventListener();
    } else if (turnObj.mode === 0) {
        modifyEventListener(true);
    }
    
    if (turnObj.turn === 1) {
        html.style.backgroundColor = "#778899";
        board.style.backgroundColor = "#2196F3";

        if (!turnObj.winner) {
            turnArea.textContent = "Player 1's turn";
            turnArea.appendChild(document.createElement("br"));
            turnArea.appendChild(undoButton);

            if (turnObj.turns === 0 || turnObj.mode === 4) {
                undoButton.disabled = true;
            } else if (turnObj.mode === 3) {
                undoButton.disabled = true;
                modifyEventListener();
            } else if (turnObj.mode === 2) {
                modifyEventListener(true);
            }
        }
    } else if (turnObj.turn === 2) {
        html.style.backgroundColor = "#aa8484";
        board.style.backgroundColor = "#742525";

        if (!turnObj.winner) {
            turnArea.textContent = "Player 2's turn";
            turnArea.appendChild(document.createElement("br"));
            turnArea.appendChild(undoButton);

            if (turnObj.turns === 0 || turnObj.mode === 4) {
                undoButton.disabled = true;
            } else if (turnObj.mode === 2) {
                undoButton.disabled = true;
                modifyEventListener();
            } else if (turnObj.mode === 3) {
                modifyEventListener(true);
                if (turnObj.turns === 1) {
                    undoButton.disabled = true;
                }
            }
        }
    }
    
    if (turnObj.winner === 1) {
        turnArea.textContent = "Player 1 wins";
        html.style.backgroundColor = "#778899";
        board.style.backgroundColor = "#2196F3";
    } else if (turnObj.winner === 2) {
        turnArea.textContent = "Player 2 wins";
        html.style.backgroundColor = "#aa8484";
        board.style.backgroundColor = "#742525";
    } else if (turnObj.winner === -1) {
        turnArea.textContent = "Tied game";
        html.style.backgroundColor = "#a9f5a9";
        board.style.backgroundColor = "#04b404";
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
        button1.setAttribute("onclick", "turnObj.mode=1;turnObj.startGame();");
        button2.textContent = "Human vs CPU";
        button2.setAttribute("onclick", "turnObj.mode=2;turnObj.startGame();");
        button3.textContent = "CPU vs Human";
        button3.setAttribute("onclick", "turnObj.mode=3;turnObj.startGame();setTimeout(function(){play()},500);");
        button4.textContent = "Spectate CPU vs CPU";
        button4.setAttribute("onclick", "turnObj.mode=4;turnObj.startGame();play();");

        turnArea.appendChild(button1);
        turnArea.appendChild(button2);
        turnArea.appendChild(button3);
        turnArea.appendChild(button4);
    }
}

const showDevPanel = (function() {
    let counter = 0;

    return function() {
        counter++;

        if (counter >= 15) {
            document.getElementById("debug").classList.remove("hidden");
        }
    };
})()

// this function is attached by the event listener stuff below
const boardClick = function(event) {
    if (turnObj.turn && !turnObj.winner) {
        if (event.target.classList.contains("circle-cell")) {
            if (featureToggle.logging.logClicks) {
                console.log(event.target.parentElement.parentElement.id);
            }
            gameBoard.play(event.target.parentElement.parentElement.id);
            renderGame();
        } else if (event.target.classList.contains("game-cell")) {
            if (featureToggle.logging.logClicks) {
                console.log(event.target.parentElement.id);
            }
            gameBoard.play(event.target.parentElement.id);
            renderGame();
        } else if (event.target.classList.contains("game-column")) {
            if (featureToggle.logging.logClicks) {
                console.log(event.target.id);
            }
            gameBoard.play(event.target.id);
            renderGame();
        }
    } else if (turnObj.winner === 1 || turnObj.winner === 2) {
        console.log(`Player ${turnObj.winner} won already.`);
    } else if (turnObj.winner === -1) {
        console.log("The game ended in a draw.");
    } else {
        console.log("error:  developer C is a nooblord and forgot to start the game");
    }
}

// ========== attach event handlers ==========

const modifyEventListener = function(add) {
    const gameColumns = document.getElementsByClassName("game-column");

    if (add) {
        for (let i = 0; i < gameColumns.length; i++) {
            gameColumns[i].addEventListener("click", boardClick);
        }
    } else {
        for (let i = 0; i < gameColumns.length; i++) {
            gameColumns[i].removeEventListener("click", boardClick);
        }
    }
}

modifyEventListener(true);

document.getElementsByClassName("heading")[0].addEventListener("click", function() {
    showDevPanel();
});

// ========== AI: Artificial Intelligence directed by Steven Spielberg ==========

const play = function() {
    const score = [
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}}
    ];

    // mark non-full columns as valid plays
    for (let i = 0; i < score.length; i++) {
        if (gameBoard.board[i].indexOf(0) !== -1) {
            score[i].valid = true;
        }
    }

    // play the highest scoring move (or pick a random move amongst the highest scoring moves)
    const playBestMove = function() {
        const bestMoves = [];
        let highScore = -Infinity;

        for (let i = 0; i < score.length; i++) {
            if (score[i].score > highScore && score[i].valid) {
                bestMoves.length = 0;
                bestMoves[bestMoves.length] = i;
                highScore = score[i].score;
            } else if (score[i].score === highScore && score[i].valid) {
                bestMoves[bestMoves.length] = i;
            }
        }
        
        if (featureToggle.logging.logBestMoves) {
            console.log(bestMoves);
        }
        
        gameBoard.play(bestMoves[Math.floor(Math.random() * bestMoves.length)]);
        renderGame();
    }

    playBestMove();

    if (featureToggle.logging.logAIScore) {
        console.log(score);
    }
    
}

// ========== function or method calls ==========

renderGame();