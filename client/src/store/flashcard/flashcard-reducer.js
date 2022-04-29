import { SET_FLASHCARD_LIST_OF_TERMS, SET_LOADING } from './flashcard-actions'

const initialState = {
	list: [],
	loading: false,
	error: null,
}

export const flashcardReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FLASHCARD_LIST_OF_TERMS:
			return {
				...state,
				loading: false,
				error: null,
				list: action.payload,
			}

		case SET_LOADING:
			return {
				...state,
				loading: true,
			}

		default:
			return state
	}
}
