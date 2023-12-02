/*
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
*/
const _ = require("lodash");
const fs = require("fs");
const readData = fs.readFileSync("./data.txt", "utf8");
const GAME_CONFIG = { red: 12, blue: 13, green: 14 }
// const MAX_GAME_CONFIG = Math.max(...GAME_CONFIG);
let gameData = {};

const getGameFromSet = (set, idx, setData) => {
	setData.maxVal = setData.maxVal || {
		red: 0, green: 0, blue: 0
	};
	let setNum = idx + 1;
	setData[setNum] = {};
	let setArr = set.split(", ");
	let setObj = {
		maxVal: {
			red: 0, green: 0, blue: 0
		}
	};
	setArr.forEach((item) => {
		let itemArr = item.split(" ");
		let itemNum = itemArr[0];
		let itemColor = itemArr[1];
		setObj[itemColor] = itemNum;
		setObj.maxVal[itemColor] = Math.max(setObj.maxVal[itemColor], itemNum);
		setData.maxVal[itemColor] = Math.max(setData.maxVal[itemColor], itemNum);
	});

	setData[setNum] = setObj;
}

const getGameSets = (game, gameNum) => {
	gameData[gameNum] = gameData[gameNum] || {};
	let sets = game.split("; ");
	sets.forEach((set, idx) => {
		getGameFromSet(set, idx, gameData[gameNum]);
		
	});

}

const getGameData = (line) => {
	let gameNum = line.match(/Game (\d{1,3}):/)[1];
	let game = line.match(/Game (\d{1,3}): (.*)/)[2];
	getGameSets(game, gameNum);
}

const getValidGames = (gameData) => {
	let validGames = [];
	let validGameSum = 0;
	for (key in gameData) {
		let isKeyValid = true;
		for (color in gameData[key].maxVal) {
			if (gameData[key].maxVal[color] > GAME_CONFIG[color]) {
				isKeyValid = false;
				break;
			}
		}
		if (isKeyValid) {
			validGames.push(+key);
		} else {
			let x = { key: key, v: gameData[key] }
			console.dir({ "💊line": "68", "data": x }, { depth: null });
			
		}
	}
	validGameSum = _.sum(validGames);
	console.log(validGames, validGameSum);

}

readData.split("\n").forEach((line, idx) => {
	getGameData(line);
});

// console.dir({ "💊line": "25", "file": "/home/stalin/dev/advent-of-code/2023/day-2/part-1.js", "key": "gameData", "data": gameData }, { depth: null });
getValidGames(gameData);