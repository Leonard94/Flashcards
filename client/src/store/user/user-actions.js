import axios from 'axios'

export const IS_AUTH_USER = 'IS_AUTH_USER'
export const SET_ERROR = 'SET_ERROR'
export const SET_LOADING = 'SET_LOADING'

const isAuthUser = (email) => ({
    type: IS_AUTH_USER,
    payload: email,
})

const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
})

const setLoading = (boolean) => ({
    type: SET_LOADING,
    payload: boolean,
})

export const checkIsAuthUser = () => (dispatch) => {
    axios.get('http://localhost:5000/user', { withCredentials: true }).then((response) => {
        dispatch(isAuthUser(response.data.email))
    })
}

export const login = (data) => (dispatch) => {
    dispatch(setLoading(true))
    axios
        .post('http://localhost:5000/user/login', data, {
            withCredentials: true,
        })
        .then((response) => {
            dispatch(isAuthUser(response.data.email))
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
            dispatch(isAuthUser(response.data.email))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.message))
        })
}

export const logout = () => (dispatch) => {
    dispatch(setLoading(true))
    axios.post('http://localhost:5000/user/logout', {}, { withCredentials: true }).then(dispatch(isAuthUser(null)))
}
