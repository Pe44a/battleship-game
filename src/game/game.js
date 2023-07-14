import { Player } from "../scripts/player";
import { renderShips } from "../DOMinteraction/render";


// Place ships randomly


const gameLoop = () => {
  const player1 = Player();
  const player2 = Player();

  let player1Won = false;
  let player2Won = false;
  let player1Turn = true; //Determines which player hits another player

  const player1GridItems = document.querySelectorAll('.grid-item-player1');
  const player2GridItems = document.querySelectorAll('.grid-item-player2');
  const startButton = document.querySelector('#start-button');
  const restartButton = document.querySelector('#restart-button');
  const placesShipsButton = document.querySelector('#player1-places-ships');


  // Starts game, blocks certain activities
  startButton.addEventListener('click', () => {
    placesShipsButton.disabled = true;
    startButton.classList.add('disappear');
  });


  // Places both players ships
  placesShipsButton.addEventListener('click', () => {
    player1.gameboard.placeShip(1,1,3,'x');

    renderShips('player1', player1.gameboard.getShips());

    player2.gameboard.placeShip(1,1,3,'y');



    console.log(player1.gameboard.getShips());
  });


  // Registers hits only if its players turn
  player1GridItems.forEach(gridItem => {
    gridItem.addEventListener('click', (event) => {
      event.defaultPrevented;

      if(player1Turn === true) {
        const coord = event.target.dataset.coord;
        const parsedCoord = JSON.parse(coord);//Converts string into array

        player2.gameboard.receiveAttack(parsedCoord[0], parsedCoord[1]);
        player1Won = player2.gameboard.allShipsSunk();
        console.log(player2.gameboard.getShips());
        console.log(player2.gameboard.allShipsSunk());
        checkWinner();
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
        const parsedCoord = JSON.parse(coord);//Converts string into array

        player1.gameboard.receiveAttack(parsedCoord[0], parsedCoord[1]);
        player2Won = player1.gameboard.allShipsSunk();
        console.log(player1.gameboard.getShips());
        console.log(player1.gameboard.allShipsSunk());
        checkWinner();
        // render
        player1Turn = true;
      }

   });
  });


  const checkWinner = () => {
    if (player1Won || player2Won) {
      const board = document.querySelector('.board');
      board.classList.add('disabled');
      restartButton.classList.remove('disappear');
      startButton.classList.add('disappear');
    }
  
    return player1Won ? 'Player1 won' : player2Won ? 'Player2 won' : undefined;
  };
  
};




export {gameLoop};