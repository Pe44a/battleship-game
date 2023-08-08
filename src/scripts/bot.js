const Bot = (enemyPlayer) => {
    const attackDelay = 1000; // Delay in milliseconds between attacks
    let hunting = false;
    let targets = [];

    const huntTarget = () => {
        let guessRow, guessCol;

        if (targets.length === 0) {
            [guessRow, guessCol] = guessRandom();
        } else {
            [guessRow, guessCol] = targets.pop();
        }

        if (enemyPlayer.gameboard.receiveAttack(guessRow, guessCol)) {
            console.log(`Bot hit: [${guessRow}, ${guessCol}]`);
            if (!hunting) {
                hunting = true;
                const potentialTargets = [
                    [guessRow + 1, guessCol], [guessRow, guessCol + 1],
                    [guessRow - 1, guessCol], [guessRow, guessCol - 1]
                ];

                potentialTargets.forEach(([targetRow, targetCol]) => {
                    if (isValidCoordinate(targetRow, targetCol) &&
                        !hasBeenShot(targetRow, targetCol) &&
                        !isTargeted(targetRow, targetCol)) {
                        targets.push([targetRow, targetCol]);
                    }
                });
            }
        } else {
            console.log(`Bot missed: [${guessRow}, ${guessCol}]`);
            if (hunting) {
                targets = []; // Clear the targets if a miss occurs
            }
            hunting = false; // Stop hunting if a miss occurs
        }
    };

    const guessRandom = () => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        return [row, col];
    };

    const isValidCoordinate = (row, col) => {
        return row >= 0 && row <= 9 && col >= 0 && col <= 9;
    };

    const hasBeenShot = (row, col) => {
        return enemyPlayer.gameboard.getMissedShots().some(([missedRow, missedCol]) =>
            missedRow === row && missedCol === col
        );
    };

    const isTargeted = (row, col) => {
        return targets.some(([targetRow, targetCol]) =>
            targetRow === row && targetCol === col
        );
    };

    const randomDelayAttack = () => {
        setTimeout(() => {
            huntTarget();
        }, attackDelay);
    };

    const startAttacking = () => {
        console.log('Bot: Starting attack...');
        randomDelayAttack();
    };

    return { startAttacking};
};

export { Bot };