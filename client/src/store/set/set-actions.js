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

export const getWords = (setId) => async (dispatch) => {
    console.log(setId)
    axios
        .get(`http://localhost:5000/sets/${setId}`, { withCredentials: true })
        .then((response) => {
            console.log(response.data[0])
            dispatch(setCurrentSet(response.data[0]))
        })
        .catch((err) => {
            // setError(err.response)
            console.log(err.response)
        })
}
