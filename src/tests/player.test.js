import {Player} from '../scripts/player'


test('should test if gameboard works properly', () => {
  const player = Player();
  player.gameboard.placeShip(4,6,3,'y');
  player.gameboard.receiveAttack(4,6);

    expect(player.gameboard.getShips()).toEqual([
        [ [[4,6], [4,7], [4,8]], {length:3, hitAmount:1, sunk:false} ]
    ]);

});