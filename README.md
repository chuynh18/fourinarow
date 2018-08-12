Four-in-a-row
=============

The plan is:
* __Done:__ Get the HTML and CSS set up so that a board is represented
* __Done:__ Hook into the board with some basic JavaScript and get the game board represented in code
* __Done:__ Get the game logic stood up so that it can be played with two players
* Get a basic first-pass "AI" stood up.  I don't claim to understand all the intricacies of this game, so the first-pass will probably be incredibly easy to beat.
* Refine the AI so that it plays a little better.  This may be tricky, as I'll have to develop some insights into the game as I go along.

What I will _NOT_ be doing:
* I won't be focusing on the interface so much.  This is more about getting the logic and functionality in place, as that is the challenge I am deliberately focusing on.  I will, however, make it so the page is usable on mobile as well as desktop.

Things that I would like to do better compared to Tic-Tac-Toe:
* In Tic-Tac-Toe, I had places in code where I referred to cells on the game board by ID (0 through 8), while in other places, I used coordinate pairs (that is, [0,0] through [2,2]).  While it is trivial to convert between the two, I would like to minimize the number of conversions.  That is, I should be more thoughtful about the interface between the two "coordinate systems".
* I would like to structure my code better, mainly by being more modular (being more intentional about dependencies).