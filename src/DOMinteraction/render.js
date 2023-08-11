// Fills both  player boards
// Individual grid items for players
const generateGridItems = () => {
    const player1Board = document.querySelector('#player1-board');
    const player2Board = document.querySelector('#player2-board');
    player1Board.classList.add('disabled');
    player2Board.classList.add('disabled');

    for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.classList.add('grid-item-player1');
            gridItem.dataset.coord = `[${x}, ${y}]`;
            player1Board.appendChild(gridItem);
        }
    }


    for (let y = 1; y <= 10; y++) {
        for (let x = 1; x <= 10; x++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.classList.add('grid-item-player2');
            gridItem.dataset.coord = `[${x}, ${y}]`;
            player2Board.appendChild(gridItem);
        }
    }

}

//Renders ships for a chosen player
const renderShips = (player, shipsInfo) => {
    const playerGridItems = document.querySelectorAll('.grid-item-' + player);

    for (let i = 0; i < shipsInfo.length; i++) { //Goes through every ship array

        for (let j = 0; j < shipsInfo[i][0].length; j++) { //Goes through every ships coord values
            
            for (let k = 0; k < playerGridItems.length; k++) { //Goes through every players grid item
                const coord = playerGridItems[k].dataset.coord;
                const coordArray = JSON.parse(coord); //Coord value
    
                if(shipsInfo[i][0][j][0] === coordArray[0] && //If grid items value matches ships coord value
                   shipsInfo[i][0][j][1] === coordArray[1]) { 
    
                    playerGridItems[k].classList.add('ship'); // Marks that there is a ship  
                }  
            }
        }
        
        
    }
        
};


export {generateGridItems, renderShips}