import axios from 'axios'

export const SET_CURRENT_SET = '@@set/SET_CURRENT_SET'
export const SET_LOADING = '@@set/SET_LOADING'
export const SET_ERROR = '@@set/SET_ERROR'

const setCurrentSet = (arr) => ({
	type: SET_CURRENT_SET,
	payload: arr,
})

const setLoading = (boolean) => ({
	type: SET_LOADING,
	payload: boolean,
})

const setError = (error) => ({
	type: SET_ERROR,
	payload: error,
})

// Получаем набор пользователя
export const getTheSet = (setId) => async (dispatch) => {
	axios
		.get(`http://localhost:5000/sets/set/${setId}`, { withCredentials: true })
		.then((response) => {
			dispatch(setCurrentSet(response.data[0]))
		})
		.catch((err) => {
			setError(err.response)
			console.log(err.response)
		})
}

// Удаляем набор
export const deleteTheSet = (setId) => async (dispatch) => {
	return axios
		.put(
			`http://localhost:5000/sets/set/delete`,
			{ setId },
			{ withCredentials: true }
		)
		.then((response) => {
			//
		})
		.catch((err) => {
			console.log(err.response)
			setError(err.response)
		})
}

// Добавляем новый термин в набор
export const addNewTermToTheSet = (data) => async (dispatch) => {
	console.log('addNewTerm = set actions')
	return axios
		.put(`http://localhost:5000/sets/set/add-new-word`, data, {
			withCredentials: true,
		})
		.then((response) => {
			// Если бы сервер возвращал актуальную версию текущего набора, можно было сразу диспачить отсюда
		})
		.catch((err) => {
			console.log(err)
			setError(err)
		})
}

// Переименовываем набор
export const renameTheSet = (data) => async (dispatch) => {
	return axios
		.put(`http://localhost:5000/sets/set/rename`, data, {
			withCredentials: true,
		})
		.then((response) => {
			// Если бы сервер возвращал актуальную версию текущего набора, можно было сразу диспачить отсюда
			dispatch(getTheSet(data.setId))
		})
		.catch((err) => {
			console.log(err.response)
			setError(err.response)
		})
}

// Переименовываем термин
export const renameTheTerm = (data) => async (dispatch) => {
	return axios
		.put(`http://localhost:5000/sets/set/term/rename`, data, {
			withCredentials: true,
		})
		.then((response) => {
			// Если бы сервер возвращал актуальную версию текущего набора, можно было сразу диспачить отсюда
		})
		.catch((err) => {
			console.log(err.response)
			setError(err.response)
		})
}

// Удаляем термин
export const removeTheTerm = (data) => async (dispatch) => {
	return axios
		.put(`http://localhost:5000/sets/set/term/remove`, data, {
			withCredentials: true,
		})
		.then((response) => {
			// Если бы сервер возвращал актуальную версию текущего набора, можно было сразу диспачить отсюда
		})
		.catch((err) => {
			console.log(err.response)
			setError(err.response)
		})
}

// Удаляем термин
export const toggleCompletedTheTerm = (data) => async (dispatch) => {
	return axios
		.put(`http://localhost:5000/sets/set/term/toggle-completed`, data, {
			withCredentials: true,
		})
		.then((response) => {
			dispatch(getTheSet(data.setId))
		})
		.catch((err) => {
			console.log(err.response)
			setError(err.response)
		})
}
