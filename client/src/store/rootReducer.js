import { combineReducers } from 'redux'

import { userReducer } from './user/user-reducer'
import { setsReducer } from './sets/sets-reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    sets: setsReducer,
})
