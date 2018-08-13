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
    loadDebugBoard: function() {
        this.board = [
            [1,2,1,2,0,0],
            [1,2,1,2,0,0],
            [1,2,1,2,0,0],
            [2,1,2,1,0,0],
            [2,1,2,1,0,0],
            [2,1,2,1,0,0],
            [1,2,1,2,0,0]
        ];
        turnObj.turns = 28;
        turnObj.moveList = [0,0,0,0,1,1,1,1,2,2,2,2,6,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6];
        renderGame();
    },
    reset: function() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = 0;
            }
        }
    },
    play: function(column, simulate, opposite) {
        if (!turnObj.winner) {
            if (turnObj.turn !== 0) {
                if (this.board[column].indexOf(0) !== -1) {
                    if (opposite) {
                        this.board[column][this.board[column].indexOf(0)] = turnObj.inverseTurn;
                    } else {
                        this.board[column][this.board[column].indexOf(0)] = turnObj.turn;
                    }

                    turnObj.play();
                    if (!simulate){
                        this.check();
                    }
                    turnObj.move(column);
                } else {
                    console.log(`error:  column ${column} is full`);
                    console.log(gameBoard.board);
                }
            } else {
                console.log("error:  developer C is a nooblord and forgot to start the game");
            }

            if (turnObj.mode === 4 && !simulate && turnObj.winner === 0) {
                setTimeout(function() {
                    play();
                }, featureToggle.ai.speed);
            } else if (turnObj.mode === 2 && turnObj.turn === 2 && !simulate && turnObj.winner === 0) {
                setTimeout(function() {
                    play();
                }, featureToggle.ai.speed);
            } else if (turnObj.mode === 3 && turnObj.turn === 1 && !simulate && turnObj.winner === 0) {
                setTimeout(function() {
                    play();
                }, featureToggle.ai.speed);
            }
        } else {
            console.log("error:  someone already won");
        }
    },
    undo: function(rerender) {
        const lastPlay = turnObj.moveList[turnObj.moveList.length - 1];

        if (lastPlay !== "undefined") {
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
    checkCol: function(simulate, three) {
        let jEnd = 2;

        if (three) {
            jEnd = 3;
        }

        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= jEnd; j++) {
                let array = [gameBoard.board[i][j], gameBoard.board[i][j+1], gameBoard.board[i][j+2]];

                if (!three) {
                    array = [gameBoard.board[i][j], gameBoard.board[i][j+1], gameBoard.board[i][j+2], gameBoard.board[i][j+3]];
                }

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(2);

                        gameBoard.highlightWin(i, j, "p2Win");
                        gameBoard.highlightWin(i, j+1, "p2Win");
                        gameBoard.highlightWin(i, j+2, "p2Win");
                        gameBoard.highlightWin(i, j+3, "p2Win");
                    } else {
                        return 2;
                    }
                    
                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("col win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                    
                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(1);

                        gameBoard.highlightWin(i, j, "p1Win");
                        gameBoard.highlightWin(i, j+1, "p1Win");
                        gameBoard.highlightWin(i, j+2, "p1Win");
                        gameBoard.highlightWin(i, j+3, "p1Win");
                    } else {
                        return 1;
                    }

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("col win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                }
            }
        }
    },
    checkRow: function(simulate, three) {
        let iEnd = 3;

        if (three) {
            iEnd = 4;
        }

        for (let i = 0; i <= iEnd; i++) {
            for (let j = 0; j <= 5; j++) {
                let array = [gameBoard.board[i][j], gameBoard.board[i+1][j], gameBoard.board[i+2][j]];

                if (!three) {
                    array = [gameBoard.board[i][j], gameBoard.board[i+1][j], gameBoard.board[i+2][j], gameBoard.board[i+3][j]];
                }

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(2);

                        gameBoard.highlightWin(i, j, "p2Win");
                        gameBoard.highlightWin(i+1, j, "p2Win");
                        gameBoard.highlightWin(i+2, j, "p2Win");
                        gameBoard.highlightWin(i+3, j, "p2Win");
                    } else {
                        return 2;
                    }
    
                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("row win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }

                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(1);

                        gameBoard.highlightWin(i, j, "p1Win");
                        gameBoard.highlightWin(i+1, j, "p1Win");
                        gameBoard.highlightWin(i+2, j, "p1Win");
                        gameBoard.highlightWin(i+3, j, "p1Win");
                    } else {
                        return 1;
                    }

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("row win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                }
            }
        }
    },
    checkDiagA: function(simulate, three) {
        let iEnd = 3;
        let jStart = 3;

        if (three) {
            iEnd = 4;
            jStart = 2;
        }

        for (let i = 0; i <= iEnd; i++) {
            for (let j = jStart; j <= 5; j++) {
                let array = [gameBoard.board[i][j], gameBoard.board[i+1][j-1], gameBoard.board[i+2][j-2]];
                
                if (!three) {
                    array = [gameBoard.board[i][j], gameBoard.board[i+1][j-1], gameBoard.board[i+2][j-2], gameBoard.board[i+3][j-3]];
                }

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(2);

                        gameBoard.highlightWin(i, j, "p2Win");
                        gameBoard.highlightWin(i+1, j-1, "p2Win");
                        gameBoard.highlightWin(i+2, j-2, "p2Win");
                        gameBoard.highlightWin(i+3, j-3, "p2Win");
                    } else {
                        return 2;
                    }

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagA win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }

                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(1);

                        gameBoard.highlightWin(i, j, "p1Win");
                        gameBoard.highlightWin(i+1, j-1, "p1Win");
                        gameBoard.highlightWin(i+2, j-2, "p1Win");
                        gameBoard.highlightWin(i+3, j-3, "p1Win");
                    } else {
                        return 1;
                    }
                    
                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagA win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                }
            }
        }
    },
    checkDiagB: function(simulate, three) {
        let iEnd = 3;
        let jEnd = 2;

        if (three) {
            iEnd = 4;
            jEnd = 3;
        }

        for (let i = 0; i <= iEnd; i++) {
            for (let j = 0; j <= jEnd; j++) {
                let array = [gameBoard.board[i][j], gameBoard.board[i+1][j+1], gameBoard.board[i+2][j+2]];
                
                if (!three) {
                    array = [gameBoard.board[i][j], gameBoard.board[i+1][j+1], gameBoard.board[i+2][j+2], gameBoard.board[i+3][j+3]];
                }

                if (array.indexOf(0) === -1 && array.indexOf(1) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(2);

                        gameBoard.highlightWin(i, j, "p2Win");
                        gameBoard.highlightWin(i+1, j+1, "p2Win");
                        gameBoard.highlightWin(i+2, j+2, "p2Win");
                        gameBoard.highlightWin(i+3, j+3, "p2Win");
                    } else {
                        return 2;
                    }

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagB win p2");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }

                } else if (array.indexOf(0) === -1 && array.indexOf(2) === -1) {
                    if (!simulate) {
                        turnObj.setWinner(1);

                        gameBoard.highlightWin(i, j, "p1Win");
                        gameBoard.highlightWin(i+1, j+1, "p1Win");
                        gameBoard.highlightWin(i+2, j+2, "p1Win");
                        gameBoard.highlightWin(i+3, j+3, "p1Win");
                    } else {
                        return 1;
                    }

                    if (featureToggle.logging.logWinDebugInfo) {
                        console.log("diagB win p1");
                        console.log(array);
                        console.log(`Starting cell: (${i}, ${j})`);
                    }
                }
            }
        }
    },
    check: function(simulate, three) {
        if (!simulate) {
            this.checkCol();
            this.checkRow();
            this.checkDiagA();
            this.checkDiagB();
        } else {
            let colWin = this.checkCol(simulate);
            let rowWin = this.checkRow(simulate);
            let diagAWin = this.checkDiagA(simulate);
            let diagBWin = this.checkDiagB(simulate);

            if (three) {
                colWin = this.checkCol(simulate, three);
                rowWin = this.checkRow(simulate, three);
                diagAWin = this.checkDiagA(simulate, three);
                diagBWin = this.checkDiagB(simulate, three);
            }

            if (colWin === 1 || rowWin === 1 || diagAWin === 1 || diagBWin === 1) {
                return 1;
            } else if (colWin === 2 || rowWin === 2 || diagAWin === 2 || diagBWin === 2) {
                return 2;
            }
        }
        
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

            // tied game
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
        
    },
    setWinner: function(player) {
        this.winner = player;
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

    var playButton = document.createElement("button");
    playButton.textContent = "play()";
    playButton.setAttribute("onclick", "play()");

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

            if (featureToggle.debug.playButton) {
                turnArea.appendChild(playButton);
            }
            
            if (turnObj.turns === 0) {
                undoButton.disabled = true;
                if (turnObj.mode === 2) {
                    modifyEventListener(true);
                }
            } else if (turnObj.mode === 4) {
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

            if (featureToggle.debug.playButton) {
                turnArea.appendChild(playButton);
            }

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

        if (counter >= 5) {
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

// ==== dev panel functions ====

// populate dev panel
const syncDevPanel = function() {
    const lookAhead = document.getElementById("toggleLookAhead");
    const blockThree = document.getElementById("toggleBlockThree");
    const connectThree = document.getElementById("toggleConnectThree");
    const avoidNickTrap = document.getElementById("toggleAvoidNickTrap");
    const speed = document.getElementById("toggleSpeed");
    const logBestMoves = document.getElementById("toggleLogBestMoves");
    const logAIScore = document.getElementById("toggleLogAIScore");
    const logWinDebugInfo = document.getElementById("toggleLogWinDebugInfo");
    const logClicks = document.getElementById("toggleLogClicks");
    const showPlayButton = document.getElementById("toggleShowPlayButton");

    lookAhead.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.ai, 'lookAhead');">${featureToggle.ai.lookAhead}</button>`;
    blockThree.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.ai, 'blockThree');">${featureToggle.ai.blockThree}</button>`;
    connectThree.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.ai, 'connectThree');">${featureToggle.ai.connectThree}</button>`;
    avoidNickTrap.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.ai, 'avoidNickTrap');">${featureToggle.ai.avoidNickTrap}</button>`;
    speed.innerHTML = `<button class="featureToggler" id="setSpeed" onclick="setSpeed(featureToggle.ai, 'speed');">Set</button><form id="formSpeed"><input type="number" id="inputSpeed" value="${featureToggle.ai.speed}"></input></form>`;
    logBestMoves.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.logging, 'logBestMoves');">${featureToggle.logging.logBestMoves}</button>`;
    logAIScore.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.logging, 'logAIScore');">${featureToggle.logging.logAIScore}</button>`;
    logWinDebugInfo.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.logging, 'logWinDebugInfo');">${featureToggle.logging.logWinDebugInfo}</button>`;
    logClicks.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.logging, 'logClicks');">${featureToggle.logging.logClicks}</button>`;
    showPlayButton.innerHTML = `<button class="featureToggler" onclick="flipFeatureToggle(featureToggle.debug, 'playButton');">${featureToggle.debug.playButton}</button>`;
    
    console.log(featureToggle);
}

// const flipFeatureToggle
const flipFeatureToggle = function(path, key) {
    if (path[key] === true) {
        path[key] = false;
    } else {
        path[key] = true;
    }

    syncDevPanel();
}

const setSpeed = function(path, key) {
    const newSpeed = document.getElementById("inputSpeed").value;
    path[key] = newSpeed;
    syncDevPanel();
}

// ========== AI: Artificial Intelligence directed by Steven Spielberg ==========

const play = function() {
    let score = [
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}},
        {"score": 0, "valid": false, "voters": {}}
    ];

    // mark non-full columns as valid plays and vice versa
    const validityCheck = function() {
        for (let i = 0; i < score.length; i++) {
            if (gameBoard.board[i].indexOf(0) !== -1) {
                score[i].valid = true;
            } else {
                score[i].valid = false;
            }
        }
    }

    // ==== AI voter definitions here ====

    // looks ahead 2 turns
    const lookAhead = function() {
        const currentTurn = turnObj.turn;
        const currentInverseTurn = turnObj.inverseTurn;

        for (let i = 0; i < score.length; i++) {
            if (score[i].valid) {
                // check to see if the move would block the opponent's win
                gameBoard.play(i, true, true);
                
                if (gameBoard.check(true) === currentInverseTurn) {
                    score[i].score += 25;
                    if (!score[i].voters.blockOpponentWin) {
                        score[i].voters.blockOpponentWin = 25;
                    } else {
                        score[i].voters.blockOpponentWin += 25;
                    }
                }

                gameBoard.undo(false);

                // check to see if the move being considered would lead to a win
                gameBoard.play(i, true);

                if (gameBoard.check(true) === currentTurn) {
                    score[i].score += 100;
                    if (!score[i].voters.winningMove) {
                        score[i].voters.winningMove = 100;
                    } else {
                        score[i].voters.winningMove += 100;
                    }
                }

                validityCheck();

                // check to see if the opponent's followup move would be a winning play
                for (let j = 0; j < score.length; j++) {
                    if (score[j].valid) {
                        gameBoard.play(j, true);

                        if (gameBoard.check(true) === currentInverseTurn) {
                            score[i].score -= 20;
                            if (!score[i].voters.opponentWouldWin) {
                                score[i].voters.opponentWouldWin = -20;
                            } else {
                                score[i].voters.opponentWouldWin -= 20;
                            }
                        }

                        gameBoard.undo(false);
                    }
                }

                gameBoard.undo(false);
            }
        }
    }

    // start blocking the moment opponent has 3 in a row
    const blockThree = function() {
        const currentInverseTurn = turnObj.inverseTurn;

        for (let i = 0; i < score.length; i++) {
            if (score[i].valid) {
                // check to see if the move would block the opponent's win
                gameBoard.play(i, true, true);
                
                if (gameBoard.check(true, true) === currentInverseTurn) {
                    score[i].score += 15;
                    if (!score[i].voters.blockThree) {
                        score[i].voters.blockThree = 15;
                    } else {
                        score[i].voters.blockThree += 15;
                    }
                }

                gameBoard.undo(false);
            }
        }
    }

    // try to make three in a row
    const connectThree = function() {
        const currentTurn = turnObj.turn;

        for (let i = 0; i < score.length; i++) {
            if (score[i].valid) {
                gameBoard.play(i, true);
                
                if (gameBoard.check(true, true) === currentTurn) {
                    score[i].score += 10;
                    if (!score[i].voters.connectThree) {
                        score[i].voters.connectThree = 10;
                    } else {
                        score[i].voters.connectThree += 10;
                    }
                }

                gameBoard.undo(false);
            }
        }
    }

    const avoidNickTrap = function() {
        for (let i = 1; i < score.length - 1; i++) {
            const currentRow = gameBoard.board[i].indexOf(0);
            let array;

            if (currentRow !== -1) {
                array = [gameBoard.board[i-1][currentRow], gameBoard.board[i][currentRow], gameBoard.board[i+1][currentRow]];

                if (array[0] === turnObj.inverseTurn && array[2] === turnObj.inverseTurn) {
                    score[i].score += 50;
                    if (!score[i].voters.avoidNickTrap) {
                        score[i].voters.avoidNickTrap = 50;
                    } else {
                        score[i].voters.avoidNickTrap += 50;
                    }
                }
            }
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

        const moveToPlay = Math.floor(Math.random() * bestMoves.length)
        console.log(`Column played: ${bestMoves[moveToPlay]}`);
        gameBoard.play(bestMoves[moveToPlay]);
        renderGame();
    }

    // ==== AI function calls here ====

    validityCheck();

    if (featureToggle.ai.lookAhead) {
        lookAhead();
        validityCheck();
    }

    if (featureToggle.ai.blockThree) {
        blockThree();
        validityCheck();
    }

    if (featureToggle.ai.connectThree) {
        connectThree();
        validityCheck();
    }

    if (featureToggle.ai.avoidNickTrap) {
        avoidNickTrap();
        validityCheck();
    }

    playBestMove();

    if (featureToggle.logging.logAIScore) {
        console.log(score);
    } 
}

// ========== function or method calls ==========

// attach event handlers
modifyEventListener(true);
document.getElementsByClassName("heading")[0].addEventListener("click", function() {
    showDevPanel();
});

renderGame();

// dev panel modal stuff
const modal = document.getElementById("devPanel");
const openDevPanel = document.getElementById("showDevPanel");
const span = document.getElementById("closeButton");

openDevPanel.onclick = function() {
    syncDevPanel();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}