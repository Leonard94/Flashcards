export const loadState = () => {
	try {
		const savedState = localStorage.getItem('user')

		if (savedState === null) {
			// Если такого нет передаём undefined - сработают дефолты
			return undefined
		}

		return JSON.parse(savedState)
	} catch (err) {
		return undefined
	}
}

export const saveState = (state) => {
	try {
		const stateToBeSaved = JSON.stringify(state)
		localStorage.setItem('user', stateToBeSaved)
	} catch (err) {
		console.log(err)
	}
}
