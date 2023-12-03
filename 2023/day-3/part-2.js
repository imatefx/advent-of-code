/*

	0 1 2 3 4 5 6 7 8 9
0 | 4 6 7 . . 1 1 4 . .
1 | . . . * . . . . . .
2 | . . 3 5 . . 6 3 3 .
3 | . . . . . . # . . .
4 | 6 1 7 * . . . . . .
5 | . . . . . + . 5 8 .
6 | . . 5 9 2 . . . . .
7 | . . . . . . 7 5 5 .
8 | . . . $ . * . . . .
9 | . 6 6 4 . 5 9 8 . .
*/

const _ = require("lodash");
const fs = require("fs");
const readData = fs.readFileSync("./data-all.txt", "utf8");

const engineSpecialCharMap = {};
const engineGearCharMap = {};
const engineAllNumberMap = {};
const engineGearNumberMap = {};
const engineNumberCharMap = {};


const getSpecialCharPosition = (line) => {
	let positionIdxs = [];
	let matches = line.matchAll(/[^.0-9]/g)
	for (const match of matches) {
		// console.log(match[0], match.index);
		positionIdxs.push(match.index);
	}
	return positionIdxs;
}

const getGearCharPosition = (line) => {
	let positionIdxs = [];
	let matches = line.matchAll(/[*]/g)
	for (const match of matches) {
		// console.log(match[0], match.index);
		positionIdxs.push(match.index);
	}
	return positionIdxs;
}

const getNumberCharPosition = (line) => {
	let positionIdxs = [];
	for (let i = 0; i < line.length; i++) {
		if (!isNaN(line[i])) {
			positionIdxs.push(i);
		}
		else {
			positionIdxs.push(null);
		}
	}
	return positionIdxs;
}


const getNumberPosition = (line) => {
	let positionIdxs = {};
	let matches = line.matchAll(/\d{1,5}/g)
	for (const match of matches) {
		// console.log(match[0], match.index);
		// individualNums = match[0].split("");
		// individualNums.forEach((num, idx) => {
		// 	positionIdxs[match.index + idx] = match[0] 
		// })
		positionIdxs[match.index] = match[0] 
	}
	return positionIdxs;
}




getNearestSmallestNumber = (array, numberToFind) => {
	if (numberToFind == null) return null;
	let smallestNumber = null;
	array.forEach((num, idx) => {
		if (num <= numberToFind) {
			smallestNumber = num;
		}
	})
	// console.log(array, numberToFind, smallestNumber);
	return smallestNumber;
}

getAdjacents = (line, charIdx, engineNumberMap) => {
	let adjIdxMap = {
		topLeft: null,
		top: null,
		topRight: null,
		left: null,
		right: null,
		bottomLeft: null,
		bottom: null,
		bottomRight: null
	}
	let adjActualIdxMap = {
		topLeft: null,
		top: null,
		topRight: null,
		left: null,
		right: null,
		bottomLeft: null,
		bottom: null,
		bottomRight: null
	}

	let adjNumberMap = {
		topLeft: null,
		top: null,
		topRight: null,
		left: null,
		right: null,
		bottomLeft: null,
		bottom: null,
		bottomRight: null
	}

	// if(engineNumberCharMap[line - 1]){
	adjIdxMap.top = engineNumberCharMap[line - 1][charIdx] ? engineNumberCharMap[line - 1][charIdx] : null;
	adjIdxMap.topRight = engineNumberCharMap[line - 1][charIdx + 1] ? engineNumberCharMap[line - 1][charIdx + 1] : null;
	adjIdxMap.topLeft = engineNumberCharMap[line - 1][charIdx - 1] ? engineNumberCharMap[line - 1][charIdx - 1] : null;
	// }

	// if(engineNumberCharMap[line + 1]){
	adjIdxMap.bottom = engineNumberCharMap[line + 1][charIdx] ? engineNumberCharMap[line + 1][charIdx] : null;
	adjIdxMap.bottomRight = engineNumberCharMap[line + 1][charIdx + 1] ? engineNumberCharMap[line + 1][charIdx + 1] : null;
	adjIdxMap.bottomLeft = engineNumberCharMap[line + 1][charIdx - 1] ? engineNumberCharMap[line + 1][charIdx - 1] : null;
	// }


	adjIdxMap.right = engineNumberCharMap[line][charIdx + 1] ? engineNumberCharMap[line][charIdx + 1] : null;
	adjIdxMap.left = engineNumberCharMap[line][charIdx - 1] ? engineNumberCharMap[line][charIdx - 1] : null;


	let validNumbersOnTopLine = Object.keys(engineNumberMap[line - 1]).filter(num => num !== null);
	let validNumbersOnLine = Object.keys(engineNumberMap[line]).filter(num => num !== null);
	let validNumbersOnBottomLine = Object.keys(engineNumberMap[line + 1]).filter(num => num !== null);

	adjActualIdxMap.top = getNearestSmallestNumber(validNumbersOnTopLine, adjIdxMap.top);
	adjActualIdxMap.topRight = getNearestSmallestNumber(validNumbersOnTopLine, adjIdxMap.topRight);
	adjActualIdxMap.topLeft = getNearestSmallestNumber(validNumbersOnTopLine, adjIdxMap.topLeft);
	adjActualIdxMap.right = getNearestSmallestNumber(validNumbersOnLine, adjIdxMap.right);
	adjActualIdxMap.left = getNearestSmallestNumber(validNumbersOnLine, adjIdxMap.left);
	adjActualIdxMap.bottom = getNearestSmallestNumber(validNumbersOnBottomLine, adjIdxMap.bottom);
	adjActualIdxMap.bottomRight = getNearestSmallestNumber(validNumbersOnBottomLine, adjIdxMap.bottomRight);
	adjActualIdxMap.bottomLeft = getNearestSmallestNumber(validNumbersOnBottomLine, adjIdxMap.bottomLeft);


	adjNumberMap.top = engineNumberMap[line - 1][adjActualIdxMap.top] ? +(engineNumberMap[line - 1][adjActualIdxMap.top]) : null;
	engineNumberMap[line - 1][adjActualIdxMap.top] = null;
	adjNumberMap.topRight = engineNumberMap[line - 1][adjActualIdxMap.topRight] ? +(engineNumberMap[line - 1][adjActualIdxMap.topRight]) : null;
	engineNumberMap[line - 1][adjActualIdxMap.topRight] = null;
	adjNumberMap.topLeft = engineNumberMap[line - 1][adjActualIdxMap.topLeft] ? +(engineNumberMap[line - 1][adjActualIdxMap.topLeft]) : null;
	engineNumberMap[line - 1][adjActualIdxMap.topLeft] = null;
	adjNumberMap.right = engineNumberMap[line][adjActualIdxMap.right] ? +(engineNumberMap[line][adjActualIdxMap.right]) : null;
	engineNumberMap[line][adjActualIdxMap.right] = null;
	adjNumberMap.left = engineNumberMap[line][adjActualIdxMap.left] ? +(engineNumberMap[line][adjActualIdxMap.left]) : null;
	engineNumberMap[line][adjActualIdxMap.left] = null;
	adjNumberMap.bottom = engineNumberMap[line + 1][adjActualIdxMap.bottom] ? +(engineNumberMap[line + 1][adjActualIdxMap.bottom]) : null;
	engineNumberMap[line + 1][adjActualIdxMap.bottom] = null;
	adjNumberMap.bottomRight = engineNumberMap[line + 1][adjActualIdxMap.bottomRight] ? +(engineNumberMap[line + 1][adjActualIdxMap.bottomRight]) : null;
	engineNumberMap[line + 1][adjActualIdxMap.bottomRight] = null;
	adjNumberMap.bottomLeft = engineNumberMap[line + 1][adjActualIdxMap.bottomLeft] ? +(engineNumberMap[line + 1][adjActualIdxMap.bottomLeft]) : null;
	engineNumberMap[line + 1][adjActualIdxMap.bottomLeft] = null;

	return adjNumberMap;
}




getAllSpecialCharAdjacents = (engineSpecialCharMap) => {
	let allAdjacents = [];
	Object.keys(engineSpecialCharMap).forEach((line, idx) => {
		engineSpecialCharMap[line].forEach((charIdx) => {
			if (charIdx !== null) {
				let data = getAdjacents(+line, charIdx, engineAllNumberMap);
				// console.log(line, charIdx,data);
				allAdjacents.push(...Object.values(data));
			}
		})
	})
	return allAdjacents;
}



getAllGearCharAdjacents = (engineGearCharMap) => {
	let allAdjacents = [];
	Object.keys(engineGearCharMap).forEach((line, idx) => {
		engineGearCharMap[line].forEach((charIdx) => {
			if (charIdx !== null) {
				let data = getAdjacents(+line, charIdx, engineGearNumberMap);
				let dataArray = Object.values(data).filter(num => num !== null);
				if (dataArray.length == 2) {
					if (dataArray[0] !== null && dataArray[1] !== null) {
						allAdjacents.push(dataArray[0] * dataArray[1]);
					}
					console.log(line, charIdx, data);
				}
				// allAdjacents.push(...Object.values(data));
			}
		})
	})
	return allAdjacents;
}




console.log("  0123456789")
console.log("  ----------")
readData.split("\n").forEach((line, idx) => {
	console.log(idx, line)
	engineSpecialCharMap[idx] = getSpecialCharPosition(line);
	engineAllNumberMap[idx] = getNumberPosition(line);
	engineGearCharMap[idx] = getGearCharPosition(line);
	engineGearNumberMap[idx] = getNumberPosition(line);
	engineNumberCharMap[idx] = getNumberCharPosition(line);;
	
});

console.log("engineSpecialCharMap", engineSpecialCharMap);
console.log("engineAllNumberMap", engineAllNumberMap);
// console.log("engineNumberCharMap", engineNumberCharMap);

// console.log(getAdjacents(1, 3));


let allValues = getAllSpecialCharAdjacents(engineSpecialCharMap);
let allGearValues = getAllGearCharAdjacents(engineGearCharMap);

console.log(_.sum(allValues));
console.log(_.sum(allGearValues));

