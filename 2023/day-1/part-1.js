// import the fs module
const fs = require("fs");
const readData = fs.readFileSync("./data.txt", "utf8");
let lineTotal = 0;
readData.split("\n").forEach((line) => {
	let x = line.matchAll(/\d/g);
	x = [...x];
	let first = x[0][0];
	let last = x[x.length - 1][0];
	lineTotal += parseInt(first.concat(last));

});

console.dir({ "💊line": "18", "file": "/home/stalin/dev/scratchpad-v2/aoc/2023/day-1.js", "key": "lineTotal", "data": lineTotal}, { depth: null });
