export const declination = (number) => {
	const arr = ['термин', 'термина', 'терминов']
	number = Math.abs(number) % 100
	let number1 = number % 10

	if (number > 10 && number < 20) {
		return arr[2]
	}
	if (number1 > 1 && number1 < 5) {
		return arr[1]
	}
	if (number1 === 1) {
		return arr[0]
	}
	return arr[2]
}
