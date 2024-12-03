import fileHelper from '../utils/fileHelper.js';
const inputFile = './input.txt';
const testFile = './test.txt'

const input = fileHelper.read(inputFile)

function findAllMulPatterns(input) {
  const pattern = /mul\(\d+,\d+\)/g; // Regular expression to match all patterns globally
  return input.match(pattern) || []; // Returns an array of matches or an empty array if no matches
}

const countMulPattern = (data) => {
	const problemInput = findAllMulPatterns(data)
	const newData = problemInput.map(x => x.replace("mul(", "").replace(")", "").split(","))
	let result = 0;

	newData.forEach(pair => {
		result += Number(pair[0]) * Number(pair[1])
	});
	return result;
}

const getAllIndexes = (str, search) => {
	const indexes = []
	let i = -1;
	while ((i = str.indexOf(search, i+1)) != -1){
		indexes.push(i);
	}
	return indexes
}

const replaceWithSpaces = (input, start, end) => {
  if (start < 0 || end >= input.length || start > end) {
    throw new Error("Invalid indexes");
  }
  const spaces = ' '.repeat(end - start + 1);
  return input.slice(0, start) + spaces + input.slice(end + 1);
}

const run = () => {
	problem1(input);
	problem2();
}

const problem1 = (data) => {
	console.log('Result for problem 1: ', countMulPattern(data))
}

const problem2 = () => {
	let inputCopy = input;
	const doIndexes = getAllIndexes(inputCopy, "do()")
	const dontIndexes = getAllIndexes(inputCopy, "don't()")

	const pairs = []

	for (let index = 0; index < dontIndexes.length; index++) {
		const element = dontIndexes[index];
		const pairIndex = doIndexes.find(x => x > element)
		pairs.push([element, pairIndex])
	}

	pairs.forEach(pair => {
		inputCopy = replaceWithSpaces(inputCopy, pair[0], pair[1])
	})
	console.log("Result for problem 2: ", countMulPattern(inputCopy))
}

run()

