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
const GAME_CONFIG = { red: 12, green: 13, blue: 14 };
// const MAX_GAME_CONFIG = Math.max(...GAME_CONFIG);
let gameData = {};
let validGames = [];
let powerOfGames = [];

const getMaxObj = (line) => {
	let gameNum = line.match(/Game (\d{1,3}):/)[1];
	let game = line.match(/Game (\d{1,3}): (.*)/)[2];

	let maxRed = 0;
	let maxGreen = 0;
	let maxBlue = 0;

	let gamePower = 0;

	let reds = game.matchAll(/(\d{1,3}) red/g);
	let greens = game.matchAll(/(\d{1,3}) green/g);
	let blues = game.matchAll(/(\d{1,3}) blue/g);

	for (const match of reds) {
		maxRed = Math.max(maxRed, +match[1]);
	}
	for (const match of greens) {
		// if(gameNum == "4")
		// 	console.log(match[1]);
		maxGreen = Math.max(maxGreen, +match[1]);
	}
	for (const match of blues) {
		maxBlue = Math.max(maxBlue, +match[1]);
	}

gamePower = maxRed * maxGreen * maxBlue;
powerOfGames.push(gamePower);

	if (
		maxRed > GAME_CONFIG.red ||
		maxGreen > GAME_CONFIG.green ||
		maxBlue > GAME_CONFIG.blue
	) {
console.log(`Game ${gameNum}: PWR=${gamePower} ::  ${maxRed} red, ${maxGreen} green, ${maxBlue} blue    ::: INVALID`);

		// console.log(`Game ${gameNum} is invalid`);
	} else {
		console.log(`Game ${gameNum}: PWR=${gamePower} ::  ${maxRed} red, ${maxGreen} green, ${maxBlue} blue    ::: VALID`);
		// console.log(`Game ${gameNum} is valid`);
		validGames.push(+gameNum);
	}
};

readData.split("\n").forEach((line, idx) => {
	getMaxObj(line);
});

console.log({ validGames });
console.log(_.sum(validGames));
console.log(_.sum(powerOfGames));
