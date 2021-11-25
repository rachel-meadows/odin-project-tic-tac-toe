// Declarations and initialisations
"use strict";
const square = document.querySelectorAll(".square"); // 9x options
const token = document.querySelectorAll(".token"); // Choice of x or o
let difficulty = "Easy"; // default

document.querySelector("#difficultyButton").addEventListener('click', showDifficultyMenu);
let dropdown = document.querySelector("#difficultyMenu");

function showDifficultyMenu(){
    if (dropdown.style.display === "none") {
      dropdown.style.display = "flex";
    } else {
      dropdown.style.display = "none";
    }
    document.querySelector("#Easy").addEventListener('click', setDifficulty);
    document.querySelector("#Medium").addEventListener('click', setDifficulty);
    document.querySelector("#Hard").addEventListener('click', setDifficulty);
    console.log(difficulty)
};

let setDifficulty = function(e){
    document.querySelector("#Easy").removeEventListener('click', setDifficulty);
    document.querySelector("#Medium").removeEventListener('click', setDifficulty);
    document.querySelector("#Hard").removeEventListener('click', setDifficulty);
    difficulty = e.target.id;
    dropdown.style.display = "none";
    document.querySelector("#difficultyButton").innerText=`Difficulty: ${e.target.id} ▼`;
    startNewGame();
}

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

// Allow user to change tokens via the home button
document.querySelector("#logo").addEventListener('click', handleLogoEvent);
function handleLogoEvent() {
    document.querySelector("#tokenPickerBackground").style.display="flex";
    getToken()
};

function getToken() {
    document.querySelector("#xToken").addEventListener('click', handleEvent);
    document.querySelector("#oToken").addEventListener('click', handleEvent);

    function handleEvent() {
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
    gameControl(user, bot, difficulty);
}

let clearBoard = function() {
    for(let i=0 ; i < square.length; i++){
        square[i].textContent = "";
    }
}

let startNewGame = function(){
    bot.score = 0;
    user.score = 0;
    document.querySelector("#xScore").textContent = 0;
    document.querySelector("#oScore").textContent = 0;
    gameControl(user, bot, difficulty);
}

document.querySelector("#reset").addEventListener('click', reset);
function reset() {
    clearBoard();
    startNewGame();
};


// Main game control
function gameControl(user, bot, difficulty) {
    
    clearBoard();

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

        const setTimeoutHandler = function() {
            document.querySelector("#gameResultBackground").style.display="none";
        }
        setTimeout(setTimeoutHandler, 1000);
    }


    let startNewRound = function(){
        let availableMoves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Square IDs
        let timeout = 0;

        function afterEvents() {
            for(let i=0 ; i < square.length; i++){
                square[i].removeEventListener("click", processUserClick, {once: true});
            }
            console.log('This should be running after user click, and before the bot\'s turn');
            let gameOver = checkState(user);
            if (gameOver) {
                clearBoard();
                startNewRound();
            } else {
                botTurn();
            }
        }
        
        let processUserClick = function(e){
            if (!availableMoves.includes(e.target.id)) { // Already clicked
                playerTurn();
            } else {
                console.log("The user has clicked and processUserClick is running.")
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(afterEvents);
                e.target.textContent = user.token;
                let thisSquareIndex = availableMoves.indexOf(e.target.id);
                availableMoves.splice(thisSquareIndex, 1);
            }
        }

        let checkState = function(player) {
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
        
        let playerTurn = function() {
            for(let i=0 ; i < square.length; i++){
               square[i].addEventListener("click", processUserClick, {once: true});
            }
        }

        playerTurn();
        
        let botTurn = function() {
            console.log("difficulty: ", difficulty)
            console.log("It is now the bot's turn.")
            if (availableMoves.length != 0) {
                // Default
                let randomMove = Math.floor(Math.random() * availableMoves.length);
                let botSquare = availableMoves[randomMove];

                if (difficulty === "Easy") {
                    // Use default botSquare value for now
                } else if (difficulty === "Medium") {
                    if (availableMoves.includes("5")) {
                        botSquare = "5";
                    } else {
                        // Use default botSquare value for now
                    }
                } else { // Hard
                    // Todo: proper function here
                    if (availableMoves.includes("5")) {
                        botSquare = "5";
                    } else {
                        // Use default botSquare value for now
                    }
                }

                function wait(ms) {
                    var start = Date.now(),
                        now = start;
                    while (now - start < ms) {
                      now = Date.now();
                    }
                }

                document.getElementById(`${botSquare}`).textContent = bot.token;
                wait(400);

                let thisSquareIndex = availableMoves.indexOf(botSquare);
                availableMoves.splice(thisSquareIndex, 1);
                let gameOver = checkState(bot);
                if (gameOver) {
                    clearBoard();
                    startNewRound();
                } else {
                    playerTurn();
                }
                
            } else { // No possible moves left
                gameResult("draw");
                clearBoard();
                startNewRound();
            }
        }
    }

    // Actual sequence
    startNewRound();
}

getToken();