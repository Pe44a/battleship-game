import { Player } from "../scripts/player";


// Place ships randomly
// Place ships randomly on the player's gameboard
const placeRandomlyShips = (player) => {
    const gameboard = player.gameboard;
  
    // Array representing ship data: [amount, length]
    const shipData = [
      [1, 5], // 1 ship of length 5
      [1, 4], // 1 ship of length 4
      [1, 3], // 1 ship of length 3
      [2, 2], // 2 ships of length 2
      [2, 1]  // 2 ships of length 1
    ];
  
    // Iterate over the ship data array
    for (const [amount, length] of shipData) {
      // Place the specified number of ships of given length
      for (let i = 0; i < amount; i++) {
        let placed = false;
  
        // Keep trying until a ship is successfully placed
        while (!placed) {
          // Generate random start coordinates and direction
          const startX = Math.floor(Math.random() * 10);
          const startY = Math.floor(Math.random() * 10);
          const direction = Math.random() < 0.5 ? 'x' : 'y';
  
          // Attempt to place the ship on the gameboard
          placed = gameboard.placeShip(startX, startY, length, direction);
        }
      }
    }
  };
  


const game = () => {
    const player1 = Player();
    const player2 = Player();

    const placePlayerShips = () => {

        placeRandomlyShips(player1);
        placeRandomlyShips(player2);
    };


    // there will be render function later


    const player1Attacks = (x,y) => {
        player2.gameboard.receiveAttack(x,y);
    }

    const player2Attacks = (x,y) => {
        player1.gameboard.receiveAttack(x,y);
    }
    
    return {placePlayerShips, player1Attacks, player2Attacks};
};


export {game};