# Memory Game Project

A web based version of the classic memory game.

The project is based on starter code HTML and CSS styling provided by Udacity.

## Gameplay

The game allows users to select two cards per turn and evaluates whether the revealed images are a match.

If there is a match the cards are 'locked' in the face up position so that further clicks on those cards are not allowed.

If the cards do not match, the images are flipped face down for subsequent turns.

For each match a match counter is incremented until a total of 8 eight matches is achieved (total of 16 cards) at
which point a congratulations modal is revealed providing a summary of the user final score.

The game keeps track of total moves, total time taken and maintains a star rating based on the following criteria

  10 moves or less = 3 stars
  11 to 13 moves = 2 stars
  14 to 16 moves = 1 star
  17 moves or more = 0 stars

A reset function is available which resets the time, star rating and re-shuffles the deck.
