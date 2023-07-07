// Fills both  player boards
const generateGridItems = () => {
    const player1Board = document.querySelector('#player1-board');
    const player2Board = document.querySelector('#player2-board');


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


const renderShips = () => {
    
};


const renderMissesHits = () => {

}


export {generateGridItems}