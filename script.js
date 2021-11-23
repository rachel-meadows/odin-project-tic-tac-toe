// Declarations and initialisations
"use strict";
const square = document.querySelectorAll(".square"); // 9x options
const token = document.querySelectorAll(".token"); // Choice of x or o

// Create a player object for the user and the bot
const createPlayer = function(token, name, score) {
    return {
        name,
        token,
        score,
        increaseScore: function() {
            this.score = this.score + 1;
            if (this.token == "x") {
                document.querySelector("#xScore").textContent = this.score;
            } else if (this.token == "o") {
                document.querySelector("#oScore").textContent = this.score;
            }
        },
        setToken: function(newToken) {
            this.token = newToken;
        }
    }
};

// Create bot and user objects (creating them within getToken creates duplicates)
const bot = createPlayer("", "The Bot", 0);
const user = createPlayer("", "You", 0);

document.querySelector("#logo").addEventListener('click', () => {
    document.querySelector("#tokenPickerBackground").style.display="flex";
    getToken()
});


function getToken() {
    document.querySelector("#xToken").addEventListener('click', handleEvent);
    document.querySelector("#oToken").addEventListener('click', handleEvent);

    function handleEvent() {
        console.log("Scream!");
        if (this.id == "xToken") {
            user.setToken("x");
            bot.setToken("o");
            document.querySelector("#xName").textContent = "You:";
            document.querySelector("#oName").textContent = "The Bot:";
        } else {
            user.setToken("o");
            bot.setToken("x");
            document.querySelector("#xName").textContent = "The Bot:";
            document.querySelector("#oName").textContent = "You:";
        }
        document.querySelector("#tokenPickerBackground").style.display="none";
        document.querySelector("#xToken").removeEventListener('click', handleEvent);
        document.querySelector("#oToken").removeEventListener('click', handleEvent);
    }
    gameControl(user, bot);
}

// Main game control
function gameControl(user, bot) {
    
    let reset = function(){
        square.forEach((square) => {
            square.textContent = "";
        });
    }
    reset();

    document.querySelector("#reset").addEventListener('click', () => {
        reset();
        startNewGame();
    });

    let gameResult = function(player) {
        if (player === "draw") {
            document.querySelector("#gameResultBackground").style.background="#8a06b3";
            document.querySelector("#gameResultBackground").style.display="flex";
            document.querySelector("#gameResult").innerText="Draw!";
        } else {
            player.increaseScore();
            document.querySelector("#gameResultBackground").style.display="flex";
            document.querySelector("#gameResult").innerText=`Winner:\n${player.name}`;
            if (player.token == "x") {
                document.querySelector("#gameResultBackground").style.background="#a40222";
                document.querySelector("#gameResult").style.fontFamily="'Permanent Marker', cursive";
                
            } else {
                document.querySelector("#gameResultBackground").style.background="#00a8f3";
                document.querySelector("#gameResult").style.fontFamily="'Rye', sans-serif";
            }
        }
        setTimeout(() => { 
            document.querySelector("#gameResultBackground").style.display="none";
        }, 1500);

    }

    let startNewGame = function(){
        bot.score = 0;
        user.score = 0;
        document.querySelector("#xScore").textContent = 0;
        document.querySelector("#oScore").textContent = 0;
        startNewRound();
    }

    let startNewRound = function(){
        let availableMoves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Square IDs
        playerTurn();

        function checkState(player) {
            // See if there's a win (one of 8x possible ways)
            if (document.getElementById("1").textContent == player.token && document.getElementById("2").textContent == player.token && document.getElementById("3").textContent == player.token
            || document.getElementById("4").textContent == player.token && document.getElementById("5").textContent == player.token && document.getElementById("6").textContent == player.token
            || document.getElementById("7").textContent == player.token && document.getElementById("8").textContent == player.token && document.getElementById("9").textContent == player.token
            || document.getElementById("1").textContent == player.token && document.getElementById("4").textContent == player.token && document.getElementById("7").textContent == player.token
            || document.getElementById("2").textContent == player.token && document.getElementById("5").textContent == player.token && document.getElementById("8").textContent == player.token
            || document.getElementById("3").textContent == player.token && document.getElementById("6").textContent == player.token && document.getElementById("9").textContent == player.token
            || document.getElementById("1").textContent == player.token && document.getElementById("5").textContent == player.token && document.getElementById("9").textContent == player.token
            || document.getElementById("3").textContent == player.token && document.getElementById("5").textContent == player.token && document.getElementById("7").textContent == player.token) {
                gameResult(player);
                return true;
            } else {
                return false;
            }
        }
        
        // Issue is here
        // "You can't remove a => listener, since a new function will be created each time the render method is called"
        // https://stackoverflow.com/questions/47391178/javascript-event-listener-memory-leak
        function playerTurn() {
            square.forEach((square) => {
                square.addEventListener('click', function handlePlayerClick() {
                    if (!availableMoves.includes(square.id)) {
                        // Already clicked
                        playerTurn();
                    } else {
                        square.textContent = user.token;
                        let thisSquareIndex = availableMoves.indexOf(square.id);
                        availableMoves.splice(thisSquareIndex, 1);
                        let gameOver = checkState(user);
                        if (gameOver) {
                            reset();
                            startNewRound();
                        } else {
                            botTurn();
                        }
                    }
                });
            }); 
        }

        function botTurn() {
            if (availableMoves.length != 0) {
                let randomMove = Math.floor(Math.random() * availableMoves.length);
                let botSquare = availableMoves[randomMove];
                setTimeout(() => { 
                    document.getElementById(`${botSquare}`).textContent = bot.token;
                }, 700);
                console.log("bot move: ", botSquare)
                let thisSquareIndex = availableMoves.indexOf(botSquare);
                availableMoves.splice(thisSquareIndex, 1);
                let gameOver = checkState(bot);
                if (gameOver) {
                    reset();
                    startNewRound();
                } else {
                    playerTurn();
                }
                
            } else { // No possible moves left
                gameResult("draw");
                reset();
                startNewRound();
            }
        }
    }

    // Actual sequence
    startNewRound();
}


getToken();