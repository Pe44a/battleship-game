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
    
    
    
    const placeAllShips = (player) => {
      placeShipRandomly(5,player);
      placeShipRandomly(4,player);
      placeShipRandomly(3,player);
      placeShipRandomly(2,player);
      placeShipRandomly(2,player);
      placeShipRandomly(1,player);
      placeShipRandomly(1,player);
    }
    
    

export {placeAllShips};