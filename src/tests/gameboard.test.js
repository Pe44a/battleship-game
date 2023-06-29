import { Gameboard } from "../scripts/gameboard";


test('should place ship at desired location, with a x direction', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(5, 3, 3, 'x');

        expect(gameboard.getShips()).toEqual([
            [ [[5,3], [6,3], [7,3]], {length:3, hitAmount:0, sunk:false} ]
        ]);
});

test('should place ship at desired location, with a y direction', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(5, 3, 3, 'y');

        expect(gameboard.getShips()).toEqual([
            [ [[5,3], [5,4], [5,5]], {length:3, hitAmount:0, sunk:false} ]
        ]);
});


test('should return false if ship is outside the board', () => {
    const gameboard = Gameboard();

        expect(gameboard.placeShip(5, 11, 3, 'y')).toBe(false);
});

test('should return false if ship is outside the board', () => {
    const gameboard = Gameboard();

        expect(gameboard.placeShip(5, 9, 3, 'y')).toBe(false);
});


test('should place multiple ships', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(5, 5, 1, 'y');
    gameboard.placeShip(2, 6, 3, 'x');
    gameboard.placeShip(8, 7, 2, 'x');
    gameboard.placeShip(1, 1, 4, 'y');

        expect(gameboard.getShips()).toEqual([
            [ [[5,5]], {length:1, hitAmount:0, sunk:false} ],
            [ [[2,6], [3,6], [4,6]], {length:3, hitAmount:0, sunk:false} ],
            [ [[8,7], [9,7]], {length:2, hitAmount:0, sunk:false} ],
            [ [[1,1], [1,2], [1,3], [1,4]], {length:4, hitAmount:0, sunk:false} ]
        ]);
});

test('gameboard should receive damage to its ship ', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(5, 3, 3, 'y');
    gameboard.receiveAttack(5,3);

        expect(gameboard.getShips()).toEqual([
            [ [[5,3], [5,4], [5,5]], {length:3, hitAmount:1, sunk:false} ]
        ]);
});

test('should update missed shots value', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(5, 3, 3, 'y');
    gameboard.receiveAttack(6,3);

        expect(gameboard.getMissedShots()).toEqual([ [6,3] ]);
});

test('should say if all ships have been sunk', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(3, 7, 3, 'y');
    gameboard.placeShip(2, 3, 3, 'x');

    gameboard.receiveAttack(3,7);
    gameboard.receiveAttack(3,8);
    gameboard.receiveAttack(3,9);

    gameboard.receiveAttack(2,3);
    gameboard.receiveAttack(3,3);
    gameboard.receiveAttack(4,3);

        expect(gameboard.allShipsSunk()).toBe(true);
});


test('should say if all ships have been sunk', () => {
    const gameboard = Gameboard();
    gameboard.placeShip(3, 7, 3, 'y');
    gameboard.placeShip(2, 3, 3, 'x');

    gameboard.receiveAttack(3,7);
    gameboard.receiveAttack(3,8);
    gameboard.receiveAttack(3,9);

    gameboard.receiveAttack(2,3);
    gameboard.receiveAttack(3,3);

        expect(gameboard.allShipsSunk()).toBe(false);
});