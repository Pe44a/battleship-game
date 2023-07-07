import { Player } from "../scripts/player";


// Place ships randomly
// Place ships randomly on the player's gameboard
// const placeRandomlyShips = (player) => {
//     const gameboard = player.gameboard;
  
    
//   };
  


const gameLoop = () => {
  const player1 = Player();
  const player2 = Player();
  let player1Won = false;
  let player2Won = false;
  let player1Turn = true; //Determines which player hits another player

  const player1GridItems = document.querySelectorAll('.grid-item-player1');
  const player2GridItems = document.querySelectorAll('.grid-item-player2');
  const startButton = document.querySelector('#start-button');
  const placesShips = document.querySelector('#player1-places-ships');


  // When game starts, it blocks to change ships coord
  startButton.addEventListener('click', () => {
    placesShips.disabled = true;
  });


  // Places both players ships randomly
  placesShips.addEventListener('click', () => {
    player1.gameboard.placeShip(1,1,3,'x');
    player1.gameboard.placeShip(3,1,3,'y');
    player1.gameboard.placeShip(7,1,3,'x');

    player2.gameboard.placeShip(7,7,3,'x');
    player2.gameboard.placeShip(5,4,3,'y');
  });


  // Registers hits only if its players turn
  player1GridItems.forEach(gridItem => {
    gridItem.addEventListener('click', (event) => {
      event.defaultPrevented;

      if (player1Turn === true) {
        const coord = event.target.dataset.coord;
        const parsedCoord = JSON.parse(coord);

        player2.gameboard.receiveAttack(parsedCoord[0], parsedCoord[1]);
        player1Won = player2.gameboard.allShipsSunk();
        // render
        player1Turn = false;
      }

   });
  });


  // Registers hits only if its players turn
  player2GridItems.forEach(gridItem => {
    gridItem.addEventListener('click', (event) => {
      event.defaultPrevented;
  
      if(player1Turn === false) {
        const coord = event.target.dataset.coord;
        const parsedCoord = JSON.parse(coord);

        player1.gameboard.receiveAttack(parsedCoord[0], parsedCoord[1]);
        player2Won = player1.gameboard.allShipsSunk();
        // render
        player1Turn = true;
      }

   });
  });


  // If one of players won, then it disables attacks on gameboards
  if(player1Won === true || player2Won === true) {
    const board = document.querySelector('.board');
    board.classList.add('disabled');
  };

  // Says which player won
  if(player1Won === true) return 'Player1 won';
  if(player2Won === true) return 'Player2 won';
};




export {gameLoop};