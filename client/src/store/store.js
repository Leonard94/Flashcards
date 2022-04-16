import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from './rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}
