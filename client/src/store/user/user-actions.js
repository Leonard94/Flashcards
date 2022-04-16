import axios from 'axios'

export const IS_AUTH_USER = 'IS_AUTH_USER'

const isAuthUser = (email) => ({
    type: IS_AUTH_USER,
    payload: email,
})

export const checkIsAuthUser = () => (dispatch) => {
    axios.get('http://localhost:5000/user', { withCredentials: true }).then((response) => {
        dispatch(isAuthUser(response.data.email))
    })
}

export const login = (data) => (dispatch) => {
    axios
        .post('http://localhost:5000/user/login', data, {
            withCredentials: true,
        })
        .then((response) => {
            dispatch(isAuthUser(response.data.email))
        })
        .catch((err) => console.log(err.message))
}

export const register = (data) => (dispatch) => {
    axios
        .post('http://localhost:5000/user/create-new', data, {
            withCredentials: true,
        })
        .then((response) => {
            dispatch(isAuthUser(response.data.email))
        })
        .catch((err) => {
            console.log(err.message)
            console.log(err.toJSON())
        })
}

export const logout = () => (dispatch) => {
    axios.post('http://localhost:5000/user/logout', {}, { withCredentials: true }).then(dispatch(isAuthUser(null)))
}
