import fileHelper from "../utils/fileHelper.js";
const inputFile = "./input.txt";
const testFile = "./test.txt";

const input = fileHelper.read(inputFile);

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const map = [];
const xIndex = [];
const aIndex = [];

const setup = () => {
  const split = fileHelper.splitIntoLines(input);
  split.forEach((line, colIndex) => {
    const charArray = fileHelper.splitByLine(line, "");

    charArray.forEach((x, rowIndex) => {
      if (x === "X") xIndex.push([colIndex, rowIndex]);
      if (x === "A") aIndex.push([colIndex, rowIndex]);
    });
    map.push(charArray);
  });
};

const run = () => {
  setup();
  problem1();
  problem2();
};

const getWordByDirection = (position, direction) => {
  let word = map[position[0]][position[1]];

  for (let index = 1; index < 4; index++) {
    const col = position[0] + direction[0] * index;
    const row = position[1] + direction[1] * index;
    if (col < 0 || row < 0 || col >= map.length || row >= map[0].length)
      continue;
    const characterAt = map[col][row];
    word += characterAt;
  }
  if (word === "XMAS") return 1;
  else return 0;
};

const problem1 = () => {
  let count = 0;
  xIndex.forEach((x) => {
    directions.forEach((direction) => {
      count += getWordByDirection(x, direction);
    });
  });
  console.log("Result for problem 1: ", count);
};

const charValueMap = {
  M: 1,
  S: 2,
};

const problem2 = () => {
  let count = 0;
  const diagonals = [
    [-1, -1], //tl
    [-1, 1],  //tr
    [1, -1],	//bl
    [1, 1],		//br
  ];

  for (let index = 0; index < aIndex.length; index++) {
    const element = aIndex[index];
		let leftDiagSum = 0;
		let rightDiagSum = 0;

    for (
      let diagonalIndex = 0;
      diagonalIndex < diagonals.length;
      diagonalIndex++
    ) {
      const diagonal = diagonals[diagonalIndex];
      const col = element[0] + diagonal[0];
      const row = element[1] + diagonal[1];
      if (col < 0 || row < 0 || col >= map.length || row >= map[0].length)
        continue;
			const characterAt = map[col][row];
			if (diagonalIndex === 0 || diagonalIndex === 3) leftDiagSum += charValueMap[characterAt]
			if (diagonalIndex === 1 || diagonalIndex === 2) rightDiagSum +=charValueMap[characterAt]
		}
		if (leftDiagSum === rightDiagSum && leftDiagSum === 3) {
			count++
		}
	}
	console.log('Result for problem 2: ', count)
};

run();
