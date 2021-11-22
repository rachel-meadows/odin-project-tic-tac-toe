// Declarations and initialisations
// const topLeftSquare = document.querySelector("#1");
// const topMidSquare = document.querySelector("#2");
// const topRightSquare = document.querySelector("#3");
// const midLeftSquare = document.querySelector("#4");
// const midMidSquare = document.querySelector("#5");
// const midRightSquare = document.querySelector("#6");
// const bottomLeftSquare = document.querySelector("#7");
// const bottomMidSquare = document.querySelector("#8");
// const bottomRightSquare = document.querySelector("#9");
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

function getToken() {
    const bot = createPlayer("");
    const user = createPlayer("");
    token.forEach((token) => {
        token.addEventListener('click', () => {
            if (token.id == "xToken") {
                user.setToken("x");
                bot.setToken("o");
            } else {
                user.setToken("o");
                bot.setToken("x");
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
        // Calculate it
        // Return it
    }

    startNewGame = function(){
        bot.score = 0;
        user.score = 0;
        startNewRound();
    }

    startNewRound = function(){
        square.forEach((square) => {
            square.addEventListener('click', function ( e ) {
                console.log(square);
                square.textContent = user.token;
            });
        });


        // Whose turn is it?
        // Is this a legal move?
        // What's the result?
        bot.increaseScore();
    }


    // Actual sequence
    startNewGame();
}

getToken();