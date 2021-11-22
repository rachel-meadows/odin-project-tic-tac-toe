// Declarations and initialisations
const square = document.querySelectorAll(".square");
const token = document.querySelectorAll(".token");

// Show players' clicks as token on the game board (i.e. x or o on the grid)
const gameBoard = function() {
    movesArray = [ [1, 2, 3], [4, 5, 6], [7, 8 , 9] ];
    showMovesArray = function(token, squareID){
        if (!squareID.innerText) {
            return squareID.innerText = token;
        } else {
            return alert("Invalid move");
        }
    }
}()

// Create a player object for the user and the bot
const createPlayer = function(token) {
    return {
        token,
        score: 0,
        increaseScore: function() {
            this.score = this.score += 1;
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

document.querySelector("#logo").addEventListener('click', () => {
    document.querySelector("#tokenPickerBackground").style.display="flex";
    getToken()
});

document.querySelector("#reset").addEventListener('click', () => {
    restart()
});


function getToken() {
    const bot = createPlayer("");
    const user = createPlayer("");
    token.forEach((token) => {
        token.addEventListener('click', () => {
            if (token.id == "xToken") {
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
        });
    });
    gameControl(user, bot);
}

// Main game control
function gameControl(user, bot) {

    getDifficultyChoice = function(){
        let difficulty = "Easy"; // Default
        // Calculate it
        // Return it
    }

    restart = function(){
        bot.score = 0;
        user.score = 0;
        square.forEach((square) => {
            square.textContent = "";
        });
        startNewGame();
    }

    startNewGame = function(){
        bot.score = 0;
        user.score = 0;
        startNewRound();
    }

    startNewRound = function(){
        let availableMoves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Square IDs
        playerTurn();
        
        function playerTurn() {
            square.forEach((square) => {
                square.addEventListener('click', function ( ) {
                    if (!availableMoves.includes(square.id)) {
                        // Already clicked
                        playerTurn();
                    } else {
                        square.textContent = user.token;
                        let thisSquareIndex = availableMoves.indexOf(square.id);
                        availableMoves.splice(thisSquareIndex, 1);
                        console.log("----------------------")
                        console.log("The user clicked: ", square);
                        console.log("Available moves: ", availableMoves);
                        console.log("----------------------")
                        botTurn();
                    }
                });
            });  
        }

        function botTurn() {
            if (availableMoves.length != 0) {
                let randomMove = Math.floor(Math.random() * availableMoves.length);
                let botSquare = availableMoves[randomMove];

                if (!availableMoves.includes(botSquare)) {
                    // Already clicked
                    botTurn();     
                } else {
                    setTimeout(() => { 
                        document.getElementById(`${botSquare}`).textContent = bot.token;
                        let thisSquareIndex = availableMoves.indexOf(botSquare);
                        availableMoves.splice(thisSquareIndex, 1);
                        console.log("The bot clicked: ", document.getElementById(`${botSquare}`));
                        console.log("Available moves: ", availableMoves);
                        playerTurn();
                    }, 500);
                }
            } else {
                console.log("No more spots.")
            }
        }

        // What's the result? e.g.
        // bot.increaseScore(); or
        // user.increaseScore();
    }


    // Actual sequence
    startNewGame();
}

getToken();