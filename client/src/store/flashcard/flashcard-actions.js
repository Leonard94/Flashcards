import axios from 'axios'

export const SET_FLASHCARD_LIST_OF_TERMS = '@@flashcard/SET_FLASHCARD_LIST_OF_TERMS'
export const SET_LOADING = '@@flashcard/SET_LOADING'

const setFlashcardListOfTerms = (list) => ({
	type: SET_FLASHCARD_LIST_OF_TERMS,
	payload: list,
})

const setLoading = (boolean) => ({
	type: SET_LOADING,
	payload: boolean,
})

// Получаем список терминов у определённого набора
export const getTheSetListOfTerms = (setId) => async (dispatch) => {
	dispatch(setLoading(true))
	axios
		.get(`http://localhost:5000/sets/set/${setId}`, { withCredentials: true })
		.then((response) => {
			dispatch(setFlashcardListOfTerms(response.data[0].study))
		})
		.catch((err) => {
			// setError(err.response)
			console.log(err.response)
		})
}
