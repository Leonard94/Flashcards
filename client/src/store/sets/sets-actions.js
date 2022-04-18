import axios from 'axios'

export const SET_SETS_LIST = 'SET_SETS_LIST'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

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

export const getSetsList = (data) => (dispatch) => {
    dispatch(setLoading(true))
    axios
        .get('http://localhost:5000/sets/', { withCredentials: true })
        .then((response) => {
            dispatch(setSetsList(response.data))
        })
        .catch((err) => {
            console.log(err.response.data)
        })
}
