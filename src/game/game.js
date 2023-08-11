import { Player } from "../scripts/player";
import {renderShips } from "../DOMinteraction/render";
// import { Bot } from "../scripts/bot";


const placeShipRandomly = (length, player) => {
let shipPlaced = false;


loop:while (shipPlaced === false) {
  const x = Math.floor(Math.random() * 10 + 1);
  const y = Math.floor(Math.random() * 10 + 1);

  const ships = player.gameboard.getShips();
  const cantPlaceHere = [];


  for (let i = 0; i < ships.length; i++) { //Goes through every ships array


    const shipLength = ships[i][1].length;
    //Default 'x' direction when ship length is equal to 1
    const shipDirection = shipLength <= 1 ? 'x' : (ships[i][0][0][0] !== ships[i][0][1][0]) ? 'x' : 'y';
    
      if (shipDirection === 'x') {
        let coords = ships[i][0][0];

        //Start coords where you can't place a ship
        let leftUp = [coords[0]-1, coords[1]-1];
        let left = [coords[0]-1, coords[1]];
        let leftDown = [coords[0]-1, coords[1]+1];

        //Push start coords
        cantPlaceHere.push([...leftUp],[...left],[...leftDown]);


        //Determines next values where you can't place ship,
        //with ships length
        for (let i = -1; i < shipLength; i++) {
          leftUp[0]++,left[0]++,leftDown[0]++;

          cantPlaceHere.push([...leftUp],[...left],[...leftDown]);
        }
      }

      if(shipDirection === 'y') {
        let coords = ships[i][0][0];

        //Start coords where you can't place a ship
        let leftUp = [coords[0]-1, coords[1]-1];
        let up = [coords[0], coords[1]-1];
        let rightUp = [coords[0]+1, coords[1]-1];

        //Push start coords
        cantPlaceHere.push([...leftUp],[...up],[...rightUp]);


        //Determines next values where you can't place ship,
        //with ships length
        for (let i = -1; i < shipLength; i++) {
          leftUp[1]++,up[1]++,rightUp[1]++;

          cantPlaceHere.push([...leftUp],[...up],[...rightUp]);
        }
      }
    }


const generateXorY = Math.random() < 0.5 ? 'x' : 'y';


//Checks if coords are not outside board
if(player.gameboard.placeShip(x,y,length, generateXorY) !== false) {

  const updatedShips = player.gameboard.getShips();
  const lastShip = updatedShips[updatedShips.length-1][0];

  //Checks if lastShip
  //isn't placed too close to another ship
  for (let i = 0; i < lastShip.length; i++) {
    for (let j = 0; j < cantPlaceHere.length; j++) {
      if(cantPlaceHere[j][0] === lastShip[i][0] && cantPlaceHere[j][1] === lastShip[i][1]) {

        player.gameboard.removeLastShip();
        player.gameboard.removeShipAmount();
        continue loop;
      }
    }
  }

  shipPlaced = true;
  }
 }
};



const randomlyPlaceAllShips = (player) => {
  placeShipRandomly(5,player);
  placeShipRandomly(4,player);
  placeShipRandomly(3,player);
  placeShipRandomly(2,player);
  placeShipRandomly(2,player);
  placeShipRandomly(1,player);
  placeShipRandomly(1,player);
}






const gameLoop = () => {
  const player1 = Player();
  const player2 = Player();

  let player1Won = false;
  let player2Won = false;

  randomlyPlaceAllShips(player1);
  randomlyPlaceAllShips(player2);
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

    randomlyPlaceAllShips(player1)
    randomlyPlaceAllShips(player2);

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

    if(player1Won ==true){
      displayResult.textContent = 'You won';
    } 
    // if (player2Won) {
      displayResult.textContent = 'You lost';
    // }
  };
  
};




export {gameLoop};