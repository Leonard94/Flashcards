import axios from 'axios'

export const SET_SETS_LIST = '@@sets/SET_SETS_LIST'
export const SET_LOADING = '@@sets/SET_LOADING'
export const SET_ERROR = '@@sets/SET_ERROR'

const setSetsList = (sets) => ({
	type: SET_SETS_LIST,
	payload: sets,
})

const setLoading = (boolean) => ({
	type: SET_LOADING,
	payload: boolean,
})

const setError = (error) => ({
	type: SET_ERROR,
	payload: error,
})

export const getSetsList = () => (dispatch) => {
	dispatch(setLoading(true))
	axios
		.get('http://localhost:5000/sets', { withCredentials: true })
		.then((response) => {
			dispatch(setSetsList(response.data))
		})
		.catch((err) => {
			setError(err.response)
			console.log(err.response)
		})
}

export const addNewSet = (data) => (dispatch) => {
	return axios
		.post(
			'http://localhost:5000/sets/new-set',
			{ title: data },
			{ withCredentials: true }
		)
		.then((response) => {
			// console.log(response)
			// Добавить сообщение успешно!
		})
		.catch((err) => {
			setError(err.response.data.message)
			console.log(err.response.data)
		})
}
