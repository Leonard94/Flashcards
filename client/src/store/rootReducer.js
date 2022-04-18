import { combineReducers } from 'redux'

import { userReducer } from './user/user-reducer'
import { setsReducer } from './sets/sets-reducer'
import { setReducer } from './set/set-reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    sets: setsReducer,
    set: setReducer,
})
