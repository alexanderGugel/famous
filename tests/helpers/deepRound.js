function deepRound(objectOrArray, precision) {
    precision = precision || 1000;
    if (typeof objectOrArray === 'number') {
        return Math.round(objectOrArray*precision)/precision;
    }

    if (Array.isArray(objectOrArray)) {
        return objectOrArray.map(deepRound, precision);
    } else {
        var roundedObject = {};
        for (var key in objectOrArray) {
            if (objectOrArray.hasOwnProperty(key)) {
                roundedObject[key] = deepRound(objectOrArray[key], precision);
            }
        }
        return roundedObject;
    }
}

module.exports = deepRound;
