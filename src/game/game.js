import { Player } from "../scripts/player";
import { renderShips } from "../DOMinteraction/render";
import { placeAllShips } from "./placeShip";


const gameLoop = () => {
  const player1 = Player();
  const player2 = Player();

  let player1Won = false;
  let player2Won = false;

  placeAllShips(player1);
  placeAllShips(player2);
  renderShips('player1', player1.gameboard.getShips());


  // DOM elements
  const player1GridItems = document.querySelectorAll('.grid-item-player1');
  const player2GridItems = document.querySelectorAll('.grid-item-player2');
  const startButton = document.querySelector('#start-button');
  const restartButton = document.querySelector('#restart-button');
  const placesShipsButton = document.querySelector('#player1-places-ships');


  // Starts game, blocks certain activities
  startButton.addEventListener('click', () => {
    placesShipsButton.disabled = true;
    startButton.classList.add('disappear');

    document.querySelector('#player1-board').classList.remove('disabled');
    document.querySelector('#player2-board').classList.remove('disabled');
  });

  restartButton.addEventListener('click', () => {
    location.reload();
  });


  // Places both players ships
  placesShipsButton.addEventListener('click', () => {
    //Removes all ships
    document.querySelectorAll('.grid-item').forEach((item) => { item.classList.remove('ship')});

    player1.gameboard.resetValues();
    player2.gameboard.resetValues();

    placeAllShips(player1)
    placeAllShips(player2);

    renderShips('player1', player1.gameboard.getShips());
  });


  const botAttack = () => {
  let botAttack = true;

    loop: while (botAttack === true) {
      const x = Math.floor(Math.random() * 10 + 1);
      const y = Math.floor(Math.random() * 10 + 1);
      
      const gridItems = document.querySelectorAll('.grid-item-player1');
      let gridItem;

      //We get the html element which values are equal to x and y
      gridItems.forEach(item => {
        const coords = JSON.parse(item.dataset.coord);
        if(coords[0] === x && coords[1] === y) gridItem = item;
      });


      // Can't attack where you already attacked
      if(gridItem.classList.contains('miss') || gridItem.classList.contains('hit')) {
        continue loop;
      }

      const result = player1.gameboard.receiveAttack(x, y);
      result === true ? gridItem.classList.add('hit'): gridItem.classList.add('miss');

      player2Won = player1.gameboard.allShipsSunk();
      checkWinner();

      if(player2Won === true) { break loop};//Stop loop if there is a winner
      if(result === true) { continue loop};
      if(result === false) { botAttack = false};
    }
  };


  // Registers hits
  player2GridItems.forEach(gridItem => {
    gridItem.addEventListener('click', (event) => {
      event.defaultPrevented;

      const target = event.target;
      const coord = event.target.dataset.coord;
      const parsedCoord = JSON.parse(coord);//Converts string into array

      const result = player2.gameboard.receiveAttack(parsedCoord[0], parsedCoord[1]);
      result === true ? target.classList.add('hit'): target.classList.add('miss');

      player1Won = player2.gameboard.allShipsSunk();
      checkWinner();

      // One more hit if you hit
      if(result === false) {botAttack()};

   });
  });


  const checkWinner = () => {
    if (player1Won || player2Won) {
      const boards = document.querySelectorAll('.board');
      boards.forEach((board) => {board.classList.add('disabled')});
      restartButton.classList.remove('disappear');
      startButton.classList.add('disappear');
    }

    const displayResult = document.querySelector('.player-result');

    if(player1Won === true){
      displayResult.textContent = 'You won';
    } 
    if (player2Won === true) {
      displayResult.textContent = 'You lost';
    }
  };
  
};


export {gameLoop};