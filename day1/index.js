import fileHelper from '../utils/fileHelper.js';
const inputFile = './input.txt';
const testFile = './test.txt'

const setup = () => {
	let input = fileHelper.read(inputFile)
	const list1 = []
	const list2 = []
	
	fileHelper.splitIntoLines(input).forEach(line => {
		const lineItems = line.split('   ')
		list1.push(Number(lineItems[0]))
		list2.push(Number(lineItems[1]))
	})

	return {
		list1,
		list2
	}
}

const run = () => {
	const data = setup();
	problem1(data);
	problem2(data);
}

const problem1 = (data) => {
	const sortedList1 = data.list1.sort()
	const sortedList2 = data.list2.sort()
	const result = sortedList1.map((x, i) => {
		return Math.abs(sortedList2[i] - x)
	}).reduce((prev, curr) => {
		return prev + curr
	}, 0)

	console.log('Result for problem 1:', result)
	return result
}

const problem2 = (data) => {
	const dict2 = {}
	data.list2.forEach(item => {
		if (dict2[item]) {
			dict2[item]++
		} else {
			dict2[item] = 1
		}
	})
	let result = 0;

	data.list1.forEach(item => {
		if (dict2[item.toString()]) {
			result += item * dict2[item.toString()]
		}
	})
	console.log('Result for problem 2: ', result)
	return result
}

run()

