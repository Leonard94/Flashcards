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

export const deleteTheSet = (setId) => async (dispatch) => {
    return axios
        .put(`http://localhost:5000/sets/set/delete`, { setId }, { withCredentials: true })
        .then((response) => {
            // 
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response)
        })
}

export const addNewWordToTheSet = (data) => async (dispatch) => {
    return axios
        .put(`http://localhost:5000/sets/set/add-new-word`, data, { withCredentials: true })
        .then((response) => {
            // Если бы сервер возвращал актуальную версию текущего набора, можно было сразу диспачить отсюда
        })
        .catch((err) => {
            console.log(err.response)
            setError(err.response)
        })
}
