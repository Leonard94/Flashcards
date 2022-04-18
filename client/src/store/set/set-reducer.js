import { SET_CURRENT_SET, SET_LOADING, SET_ERROR } from './set-actions'

const initialState = {
    currentSet: {},
    error: null,
    loading: false,
}

export const setReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_SET:
            return {
                ...state,
                currentSet: action.payload,
                error: null,
                loading: false,
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }
}
