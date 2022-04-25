import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SetsPage } from './pages/SetsPage'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

import { checkIsAuthUser, logout } from './store/user/user-actions'
import { selectAllInfoAboutUser } from './store/user/user-selectors'
import { SetDetailPage } from './pages/SetDetailPage'

function App() {
	const dispatch = useDispatch()

	const [loginIsOpen, setLoginPageIsOpen] = useState(false)
	const [isRegister, setIsRegister] = useState(false)

	const {
		email: userEmail,
		name: userName,
		loading,
		error,
	} = useSelector(selectAllInfoAboutUser)

	useEffect(() => {
		// Пользователь авторизован?
		if (userEmail === null && !loading) {
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
		return (
			<LoginPage
				setLoginPageIsOpen={setLoginPageIsOpen}
				error={error}
				loading={loading}
				isRegister={isRegister}
			/>
		)
	}

	return (
		<>
			<Header
				userEmail={userEmail}
				userName={userName}
				logout={logoutHandler}
				setLoginPageIsOpen={setLoginPageIsOpen}
				setIsRegister={setIsRegister}
				isRegister={isRegister}
			/>
			<main>
				<Routes>
					<Route
						path='/'
						element={userEmail ? <SetsPage /> : <HomePage />}
					/>
					<Route path='/:setId' element={<SetDetailPage />} />
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
