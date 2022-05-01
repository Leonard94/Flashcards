import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from './rootReducer'
import { loadState, saveState } from './localStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
	const persistedState = loadState()

	const store = createStore(
		rootReducer,
		persistedState,
		composeEnhancers(applyMiddleware(thunk))
	)

	store.subscribe(() => {
		saveState({ user: store.getState().user })
	})

	return store
}
