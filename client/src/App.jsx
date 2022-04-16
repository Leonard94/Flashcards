import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

import { Header } from './components/Header'

import { checkIsAuthUser, logout } from './store/user/user-actions'
import { selectCurrentUser } from './store/user/user-selectors'

function App() {
    const dispatch = useDispatch()

    const userEmail = useSelector(selectCurrentUser)

    useEffect(() => {
        if (!userEmail) {
            dispatch(checkIsAuthUser())
        }
    }, [userEmail, dispatch])

    const logoutHandler = () => {
        dispatch(logout())
    }

    // [] - переделать readme

    return (
        <>
            <Header userEmail={userEmail} logout={logoutHandler} />
            <main>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                    </Routes>
                </div>
            </main>
        </>
    )
}

export default App
