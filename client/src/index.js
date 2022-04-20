import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { configureStore } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = configureStore()
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
