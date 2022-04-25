import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SetsPage } from './pages/SetsPage'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

import { checkIsAuthUser, logout } from './store/user/user-actions'
import { selectCurrentUser, userIsLoading } from './store/user/user-selectors'
import { SetDetailPage } from './pages/SetDetailPage'

function App() {
	const dispatch = useDispatch()

	const [loginIsOpen, setLoginPageIsOpen] = useState(false)

	const isLoading = useSelector(userIsLoading)

	const { email: userEmail, name: userName } = useSelector(selectCurrentUser)

	useEffect(() => {
		// Пользователь авторизован?
		if (userEmail === null && !isLoading) {
			// Если userEmail пустой и нет загрузки, касающейся пользователя
			dispatch(checkIsAuthUser())
		}
	})

	// Выйти из системы
	const logoutHandler = () => {
		dispatch(logout())
	}

	// Если открыта страница авторизации\регистрации
	if (loginIsOpen) {
		// Если пользователь авторизован
		if (userEmail !== null) {
			// Закрыть страницу авторизации/регистрации
			setLoginPageIsOpen(false)
		}
		return <LoginPage setLoginPageIsOpen={setLoginPageIsOpen} />
	}

	return (
		<>
			<Header
				userEmail={userEmail}
				userName={userName}
				logout={logoutHandler}
				setLoginPageIsOpen={setLoginPageIsOpen}
			/>
			<main>
				<Routes>
					<Route
						path='/'
						element={userEmail ? <SetsPage /> : <HomePage />}
					/>
					{/* <Route path='/login' element={<LoginPage />} /> */}
					<Route path='/:setId' element={<SetDetailPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
