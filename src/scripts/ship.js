const Ship = (length) => {
    let hitAmount = 0;
    let sunk = false;

    return {length, hitAmount, sunk}
};

//Functions to manipulate Ship data
const shipFunctions = (Ship) => {

    const hit = () =>  Ship.hitAmount += 1;
    const isSunk = () =>  (Ship.length === Ship.hitAmount) ? Ship.sunk = true : Ship.sunk;

    return {hit, isSunk};
}

export {Ship, shipFunctions}