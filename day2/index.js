import fileHelper from "../utils/fileHelper.js";
const inputFile = "./input.txt";
const testFile = "./test.txt";

const setup = () => {
  let input = fileHelper.read(inputFile);
  const data = [];

  fileHelper.splitIntoLines(input).forEach((line) => {
    const lineItems = line.split(" ").map((x) => Number(x));
    data.push(lineItems);
  });
  return data;
};

const run = () => {
  const data = setup();
  problem1(data);
  problem2(data);
};

const isLineSafe = (line) => {
  const differential = line
    .map((item, index) => {
      if (index === line.length - 1) return undefined;
      return line[index + 1] - item;
    })
    .filter((x) => x !== undefined);

  const isSafe = () => {
    const isAllPositive = differential.every((num) => num > 0 && num <= 3);
    const isAllNegative = differential.every((num) => num < 0 && num >= -3);
    return isAllNegative || isAllPositive;
  };
  return isSafe();
};

const problem1 = (data) => {
  let safeCount = 0;
  data.forEach((line) => {
    if (isLineSafe(line)) {
      safeCount++;
    }
  });

  console.log("Problem 1 result: ", safeCount);
};

const problem2 = (data) => {
  let safeCount = 0;
  data.forEach((line) => {
    if (isLineSafe(line)) {
      safeCount++;
    } else {
      for (let i = 0; i < line.length; i++) {
        const removedItemLine = line.filter((_, index) => index !== i);
        const isRemovedLineSafe = isLineSafe(removedItemLine);
        if (isRemovedLineSafe) {
          safeCount++;
          break;
        }
      }
    }
  });

  console.log("Problem 2 result: ", safeCount);
};

run();

// [-1, -2, -2, -1]

// [1, 5, 1, 1]

// [-2, -1, -4, -1]

// [2, -1, 2, 1]

// [-2, -2, 0, -3]

// [2, 3, 1, 2]
