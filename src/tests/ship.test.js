// const Ship = require('../ship');
// const shipFunctions = require('../shipFunctions');
import {Ship, shipFunctions} from '../scripts/ship'


test('should add 1 to hit value', () => {
  const ship = Ship(2);
  const shipFunc = shipFunctions(ship)

  expect(shipFunc.hit()).toBe(1);
});

test('should determine that ship is has not sunk', () => {
  const ship = Ship(2);
  const shipFunc = shipFunctions(ship)

  expect(shipFunc.isSunk()).toBe(false);
});

test('should determine that ship has sunk ', () => {
  const ship = Ship(2);
  const shipFunc = shipFunctions(ship);

  shipFunc.hit();
  shipFunc.hit();
  
  expect(shipFunc.isSunk()).toBe(true);
});