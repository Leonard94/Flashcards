import { IS_AUTH_USER, SET_ERROR, SET_LOADING } from './user-actions'

const initialState = {
    email: null,
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH_USER:
            return {
                ...state,
                email: action.payload,
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

        default:
            return state
    }
}
