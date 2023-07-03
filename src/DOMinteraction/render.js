const generateGridItems = () => {
    const player1Board = document.querySelector('#player1-board');
    const player2Board = document.querySelector('#player2-board');


    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('board-grid-item');
            gridItem.dataset.coord = `[${j}, ${i}]`;
            player1Board.appendChild(gridItem);
        }
    }


    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('board-grid-item');
            gridItem.dataset.coord = `[${j}, ${i}]`;
            player2Board.appendChild(gridItem);
        }
    }


}


export {generateGridItems}