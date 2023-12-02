// import the fs module
const fs = require("fs");
const readData = fs.readFileSync("./data.txt", "utf8");
let lineTotal = 0;
let mapTable = {
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9
}
readData.split("\n").forEach((line, idx) => {
	let x = line.matchAll(/(?=([\d]|one|two|three|four|five|six|seven|eight|nine))/g);
	x = [...x];
	let first = mapTable[x[0][1]];
	let last = mapTable[x[x.length - 1][1]];
	let tot = '' + first + last;
	lineTotal += +tot
});
console.log(lineTotal);
