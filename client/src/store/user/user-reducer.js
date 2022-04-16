import { IS_AUTH_USER } from './user-actions'

const initialState = {
    email: null,
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH_USER: {
            console.log('Action Auth')
            return {
                ...state,
                email: action.payload,
                error: null,
            }
        }
        default:
            return state
    }
}
