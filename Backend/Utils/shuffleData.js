function shuffle(array) {
    for(let firstElement = 0 ; firstElement < array.length ; firstElement++) {
        const secondElement = Math.floor(Math.random() * (firstElement + 1));

        [array[firstElement], array[secondElement]] = [array[secondElement], array[firstElement]];
    }

    return array;
}

module.exports = shuffle;