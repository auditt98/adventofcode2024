import fileHelper from "../utils/fileHelper.js";
const inputFile = "./input.txt";
const testFile = "./test.txt";

let rules = [];
let updates = [];

const setup = () => {
  let input = fileHelper.read(inputFile);
  const dataList = [];

  fileHelper.splitIntoLines(input).forEach((line) => {
    const lineItems = line.split("|");
    dataList.push(lineItems);
  });

  const separatorIndex = dataList.findIndex((x) => x.length === 1);
  rules = dataList
    .slice(0, separatorIndex)
    .map((x) => [Number(x[0]), Number(x[1])])
    .sort((a, b) => a[0] - b[0]);
  updates = dataList
    .slice(separatorIndex + 1, dataList.length)
    .map((x) => x[0].split(",").map((x) => Number(x)));
};

const sortNodes = () => {
	const nodes = {}

	rules.forEach((rule) => {
		if (nodes[rule[0]] === undefined) {
			nodes[rule[0]] = {
				'l': [],
				'r': [rule[1]]
			}
		} else {
			nodes[rule[0]]['r'].push(rule[1])
		}

		if (nodes[rule[1]] === undefined) {
			nodes[rule[1]] = {
				'l': [rule[0]],
				'r': []
			}
		} else {
			nodes[rule[1]]['l'].push(rule[0])
		}
	});
	return nodes

};

const run = () => {
  setup();
  problem1();
  problem2();
};

const problem1 = () => {
	const sorted = sortNodes()
	let sum = 0;
	const unsafeUpdates = []
	updates.forEach(update => {
		let isOk = true;
		for (let index = 0; index < update.length; index++) {
			const element = update[index]
			const leftElement = index === 0 ? undefined : update[index - 1]
			const rightElement = index === update.length - 1 ? undefined : update[index + 1]
			
			if (leftElement) {
				if (!sorted[`${element}`]['l'].includes(leftElement)) {
					isOk = false
					break
				} 
			}

			if (rightElement) {
				if (!sorted[`${element}`]['r'].includes(rightElement)) {
					isOk = false
					break
				} 
			}
		}
		if (isOk) {
			sum += update[Math.floor(update.length/2)]
		} else {
			unsafeUpdates.push(update)
		}
	})

	console.log("Result for problem 1: ", sum);
	return unsafeUpdates;
};

const problem2 = () => {
	const sorted = sortNodes()
	let sum = 0;
	const unsafe = problem1();
	unsafe.forEach(update => {
		let sortedElementCount = 0;
		let i = 0
		while (sortedElementCount < update.length) {
			let element = update[i]
			let rightElement = i === update.length - 1 ? undefined : update[i + 1]
			if (rightElement) {
				if (!sorted[`${element}`]['r'].includes(rightElement)) {
					[update[i], update[i+1]] = [update[i+1], update[i]]
				}
			}
			
			i++;
			if (i === update.length) {
				i = 0;
				sortedElementCount++;
			}
		}
		sum += update[Math.floor(update.length/2)]
	})

  console.log("Result for problem 2: ", sum);
};

run();