import { SET_LOADING, SET_SETS_LIST, SET_ERROR } from './sets-actions'

const initialState = {
    setsList: [],
    error: null,
    loading: false,
}

export const setsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SETS_LIST:
            return {
                ...state,
                setsList: action.payload,
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
