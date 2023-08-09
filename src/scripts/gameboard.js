import {Ship, shipFunctions} from './ship'


//determines the coordinates of a ship on a gameboard based
//on the starting position (x and y), 
//the ship's direction (shipDirection),
// and its length 
const shipLocation = (x, y, shipDirection, length) => {
    //If value is outside the board then it returns false
    if( x < 0 || y < 0 || y > 10 || x > 10 ) return false;


    const shipLoc = [[x,y]];//Start location

    for (let index = 1; index < length; index++) {
        if(length === 1) break; //no need for iterations if ship length is 1

        if(shipDirection === 'x') {
            x++
            shipLoc.push([x,y])
        }
        if(shipDirection === 'y') {
            y++
            shipLoc.push([x,y])
        }

        //Checks each loop iterations values, if the value is outside the board
        //stop it and return false
        if( x < 0 || y < 0 || y > 10 || x > 10 ) return false;
    }

    return shipLoc;
};



const Gameboard = () => {
    const ships = []; //List of all ships
    const missedShots = [];
    let shipAmount = 0;
    let sunkShipAmount = 0;


    // Adds ship to ships list
    const placeShip = (startX, startY, shipLength, shipDirection) => {
        
        const ship = Ship(shipLength); //Creates ship object
        const shipLoc = shipLocation(startX, startY, shipDirection, shipLength); //Determines ships location
        const shipInfo = [shipLoc, ship];

        if(shipLoc === false) return false; //Can't add ship, if ship is outside the board 
        ships.push(shipInfo); //Adds new ship to ships list
        shipAmount += 1;
    };




    //Updates ship values if ship has been hit
    //Else adds attack coord to missedShot list
    const receiveAttack = (x,y) => {

        for (let i = 0; i < ships.length; i++) {
            const shipCoord = ships[i][0]; // Access the nested array within each outer array
            const shipObject = ships[i][1]; // Access the ship object
          
            for (let j = 0; j < shipCoord.length; j++) {
              if( (shipCoord[j][0] === x) && (shipCoord[j][1] === y) ) {

                const shipFunc = shipFunctions(shipObject);
                shipFunc.hit(); //Updates hitAmount value on shipObject
                shipFunc.isSunk(); //Checks if ship is sunk

                if(shipObject.sunk  === true) sunkShipAmount += 1;
                return true;
              }
            }
          }

        missedShots.push([x,y]); //Updates missed shot list
        return false;
    };


    const removeLastShip = () => {ships.pop()};
    const removeShipAmount = () => {shipAmount -= 1}
    const getShips = () => {return ships};
    const getMissedShots = () => {return missedShots};
    const allShipsSunk = () => {return (sunkShipAmount >= shipAmount) ? true : false};
    const deleteAllShips = () => {ships.length = 0}; 


    return {placeShip, receiveAttack, removeLastShip, removeShipAmount, getShips, getMissedShots, allShipsSunk, deleteAllShips};
};

export { Gameboard };