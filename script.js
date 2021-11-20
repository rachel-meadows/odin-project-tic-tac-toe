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

// Create a player object for the user and the bot, using a factory
const createPlayer = (token, score) => {
    function increaseScore () {
        this.score = this.score += 1;
        return this;
    }
    return { token, score, increaseScore };
};




// Main game control
const gameControl = function() {
    getTokenChoice = function() {
        token.forEach((token) => {
            token.addEventListener('click', () => {
                let player;
                let bot;
                if (token.id == "xToken") {
                    player = createPlayer("x", 0);
                    bot = createPlayer("o", 0); 
                } else {
                    player = createPlayer("o", 0);
                    bot = createPlayer("x", 0); 
                }
                console.log("Initial player score: ", player);
                player.increaseScore();
                console.log("After increaseScore: ", player);
            });
        });


    }
    getDifficultyChoice = function(){
        // Calculate it
        // Return it
    }
    restart = function(){
        // Calculate it
        // Return it
    }
    // Whose turn is it?
    // Is this a legal move?
    getTokenChoice();
}()

