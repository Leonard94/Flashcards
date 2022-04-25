import { SET_USER, SET_ERROR, SET_LOADING, RESET_ERROR } from './user-actions'

const initialState = {
	email: null,
	name: null,
	loading: false,
	error: null,
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				email: action.email,
				name: action.name,
				error: null,
				loading: false,
			}

		case SET_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}

		case SET_LOADING:
			return {
				...state,
				loading: action.payload,
			}

		case RESET_ERROR:
			return { ...state, error: null }

		default:
			return state
	}
}
