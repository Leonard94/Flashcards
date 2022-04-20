import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { SetsPage } from './pages/SetsPage'

import { Header } from './components/Header'

import { checkIsAuthUser, logout } from './store/user/user-actions'
import { selectCurrentUser } from './store/user/user-selectors'
import { SetDetailPage } from './pages/SetDetailPage'

function App() {
    const dispatch = useDispatch()

    const { email: userEmail, name: userName } = useSelector(selectCurrentUser)

    useEffect(() => {
        if (!userEmail) {
            dispatch(checkIsAuthUser())
        }
    }, [userEmail, dispatch])

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <Header userEmail={userEmail} userName={userName} logout={logoutHandler} />
            <main>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={userEmail ? <SetsPage /> : <HomePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/:setId' element={<SetDetailPage />} />
                    </Routes>
                </div>
            </main>
        </>
    )
}

export default App
