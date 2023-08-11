# battleship-game


Check out here: 

This is a simple implementation of the classic Battleship game using HTML, CSS, and JavaScript. The game is designed to be played by one player and bot, and it includes features like placing ships randomly, attacking opponent's ships, and determining the winner.

##Features

Random Ship Placement: The game allows players to randomly place their ships on the game board.

Ship Attacks: Player can click on grid items on their opponent's board to attack and try to hit their ships.

Restart: Players can restart the game after it's finished to play again.



##Technologies Used

-JavaScript

-Webpack

-HTML & CSS

-Jest: Jest is a testing framework for JavaScript that's used to create unit tests for various functions and components of the game.

Normalize.css: This CSS library is used to ensure consistent rendering across different web browsers by applying a consistent base style.



##Testing

Jest is used for testing the game's functions and components. To run the tests, use the command npm test.

Or check out tests here:

PASS  src/tests/gameboard.test.js
  ✓ should place ship at desired location, with a x direction (3 ms)
  ✓ should place ship at desired location, with a y direction (1 ms)
  ✓ should return false if ship is outside the board (1 ms)
  ✓ should return false if ship is outside the board
  ✓ should place multiple ships (1 ms)
  ✓ gameboard should receive damage to its ship  (1 ms)
  ✓ should update missed shots value (1 ms)
  ✓ should say if all ships have been sunk (29 ms)
  ✓ should say if all ships have been sunk (2 ms)

 PASS  src/tests/ship.test.js
  ✓ should add 1 to hit value (2 ms)
  ✓ should determine that ship is has not sunk (2 ms)
  ✓ should determine that ship has sunk 

 PASS  src/tests/player.test.js
  ✓ should test if gameboard works properly (3 ms)