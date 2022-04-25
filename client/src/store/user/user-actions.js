import axios from 'axios'

export const SET_USER = '@@user/SET_USER'
export const SET_ERROR = '@@user/SET_ERROR'
export const RESET_ERROR = '@@user/RESET_ERROR'
export const SET_LOADING = '@@user/SET_LOADING'

const setUser = (email, name) => ({
	type: SET_USER,
	email: email,
	name: name,
})

const setError = (error) => ({
	type: SET_ERROR,
	payload: error,
})

export const resetError = () => ({
	type: RESET_ERROR,
})

const setLoading = (boolean) => ({
	type: SET_LOADING,
	payload: boolean,
})

export const checkIsAuthUser = () => (dispatch) => {
	axios
		.get('http://localhost:5000/user', { withCredentials: true })
		.then((response) => {
			dispatch(setUser(response.data.email, response.data.name))
		})
		.catch((err) => {
			// console.log('Пользователь не авторизован')
		})
}

export const login = (data) => (dispatch) => {
	dispatch(setLoading(true))
	axios
		.post('http://localhost:5000/user/login', data, {
			withCredentials: true,
		})
		.then((response) => {
			dispatch(setUser(response.data.email, response.data.name))
		})
		.catch((err) => {
			dispatch(setError(err.response.data.message))
		})
}

export const registerNewUser = (data) => (dispatch) => {
	dispatch(setLoading(true))
	axios
		.post('http://localhost:5000/user/create-new', data, {
			withCredentials: true,
		})
		.then((response) => {
			dispatch(setUser(response.data.email, response.data.name))
		})
		.catch((err) => {
			dispatch(setError(err.response.data.message))
		})
}

export const logout = () => (dispatch) => {
	dispatch(setLoading(true))
	axios
		.post('http://localhost:5000/user/logout', {}, { withCredentials: true })
		.then(dispatch(setUser(null)))
}
