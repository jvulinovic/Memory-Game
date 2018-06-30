
// the array that holds all the card values
var cardDeck = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond",
                "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf",
                "fa fa-bicycle", "fa fa-bomb"]

// the deck of cards
var cards = $('.deck').children()

// holds the star ratings
var starRating = $('.stars')

// counter for the number of clicks per turn
var clicksPerTurn = 0

// counter to hold the total number of moves
var moveCounter = 0;

// array that holds the value of the cards clicked in a given turn
var clickedCards = [];

// the game timer
var timer = document.querySelector(".timer");

// variable to track total game time
var totalSeconds = 0;

// counter for total number of correct matches
var totalMatch = 0;



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Shuffles the deck and populates the grid (updates the html) with the shuffled cards
function deckSetup() {
    shuffle(cardDeck);
    cards.each(function(index){
        $( this ).prepend('<i class="'+ cardDeck[index] +'"'+ '></i>');
        }
      );
}

// Selects card on click, flips the card and increments a counter
// Starts the game timer once the first card is clicked
// initiates function to check for match when the second card is clicked
function cardSelect () {
    cards.on( 'click', function() {
        clickedCards.push(($(this).children().attr('class')));
        clicksPerTurn ++;
        $( this ).toggleClass("open show disabled");
        if (moveCounter === 0 && clicksPerTurn === 1) {countTimer()};
        if (clicksPerTurn === 2) {checkMatch()};
        }
      );
}

// Removes the cards from the deck when the game is reset
// Reverts the css styling for all cards to the game starting position
function clearDeck() {
    cards.each(function(index){
        $( this ).children().remove();
        if ($( this ).attr('class') === "card show match") {$( this ).toggleClass("show match");
        };
        if ($( this ).attr('class') === "card show match disabled") {$( this ).toggleClass("show match disabled");
        };
        if ($( this ).attr('class') === "card open show disabled") {$( this ).toggleClass("open show disabled");
        };
        if ($( this ).attr('class') === "card open show") {$( this ).toggleClass("open show")
        };
      }
    );
    deckSetup();
}

// starts the game
function gameStart() {
    deckSetup();
    cardSelect();
    $('.restart').on( 'click', function(){gameReset()});
}

// Prevents other cards from being selected after a turn and
// checks for match between the clicked cards.
// Resets the clickPerTurn for the start of the next turn.
function checkMatch(){
    cards.each(function(index){
        if ($( this ).attr('class') === "card") {$( this ).toggleClass("disabled");}
        }
      );
    if (clickedCards[0] === clickedCards[1]) {matchedCards();}
    else {pause()};
    clicksPerTurn = 0;
    clickedCards.splice(0,2);
}

// Enables cards to be clicked after a match is registered
// Increments move and match counters
// Checks whether star rating needs to be updated by invoking starUpdate function
function matchedCards() {
    cards.each(function(index){
        if ($( this ).attr('class') === "card open show disabled") {$( this ).toggleClass("open match disabled");}
        else {$( this ).toggleClass("disabled")}
        }
      );
    clickedCards.splice(0,2);
    clicksPerTurn = 0;
    moveCounter ++;
    totalMatch ++;
    $('.moves').text(moveCounter);
    starUpdate();
}

// Enables cards to be clicked if a match is not confirmed
// Increments move counter
// Checks whether star rating needs to be updated by invoking starUpdate function
function unmatchedCards() {
    cards.each(function(index){
        if($ ( this ).attr('class') === "card open show disabled") {$ ( this ).toggleClass("open show disabled");}
        else {$( this ).toggleClass("disabled")}
        }
    );
    clickedCards.splice(0,2);
    clicksPerTurn = 0;
    moveCounter ++;
    $('.moves').text(moveCounter);
    starUpdate();
}

// A pause between turns to allow time for player to register opened cards
function pause() {
    setTimeout(function(){(unmatchedCards())
    }, 1500);
}

// Updates the star rating by checking the number of moves
// Open the congratulations modal if 8 matches are confirmed
function starUpdate () {
    if (moveCounter === 0) {$(starRating.children()).replaceWith('<li><i class="fa fa-star"></i></li>');
    }
    else if (moveCounter > 10 && moveCounter < 14) {$(starRating.children()[2]).replaceWith('<li><i class="fa fa-star-o"></i></li>');
    }
    else if (moveCounter > 13 && moveCounter < 17) {$(starRating.children()[1]).replaceWith('<li><i class="fa fa-star-o"></i></li>');
    }
    else if (moveCounter > 16) {$(starRating.children()[0]).replaceWith('<li><i class="fa fa-star-o"></i></li>');
    };
    if (totalMatch === 8) {modalOpen()};
}

// The game timer
function countTimer() {
    interval = setInterval(function(){
      ++totalSeconds;
      var minute = Math.floor(totalSeconds/60);
      var seconds = totalSeconds - (minute*60);
      timer.innerHTML = "Time: " + minute + " m " + seconds + " s";
    }, 1000);
}

// Resets counters to zero
// Clears the deck
// Refreshes to star rating to the starting position of 3 star
// Invoked when the reset button is clicked or when user chooses to play again after completing the game
function gameReset () {
    moveCounter = 0;
    clicksPerTurn = 0;
    totalMatch = 0;
    $('.moves').text(moveCounter);
    totalSeconds = 0;
    clearInterval(interval);
    timer.innerHTML = "Time: 0 m 0 s ";
    clearDeck();
    starUpdate();
}

// Opens the congratulations pop-up when a user completes all matches
// Provides the final score - number of moves, star rating and time taken to complete.
// User can close box pop-up or select play again which resets the game
function modalOpen () {
    $('#Congratulations').modal();
    $('.close').on('click', function() {
        $('#Congratulations').modal('hide');}
        );
    var starFinal = document.querySelector(".stars").innerHTML;
    document.getElementById("finalstars").innerHTML = starFinal;
    var finalMinutes = Math.floor(totalSeconds/60);
    var finalSeconds = totalSeconds - (finalMinutes*60);
    $('.finalmoves').text("You took " + moveCounter + " moves.");
    $('.finaltime').text("Final Time: " + finalMinutes + " m " + finalSeconds + " s");
    clearInterval(interval);
    $('.playAgain').on('click', function() {
        $('#Congratulations').modal('hide');
        gameReset()}
    );
}

gameStart()
