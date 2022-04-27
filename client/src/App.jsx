import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SetsPage } from './pages/SetsPage'
import { Layout } from './components/Layout/Layout'

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
		// Проверяем авторизован ли пользователь
		if (userEmail === null && !loading) {
			// Если userEmail пустой и нет загрузки, касающейся пользователя
			dispatch(checkIsAuthUser())
		}
	})

	// Если нажато открыть страницу авторизации\регистрации
	if (loginIsOpen) {
		// Если пользователь авторизован
		if (userEmail !== null) {
			setLoginPageIsOpen(false)
		}
		return (
			<LoginPage
				setLoginPageIsOpen={setLoginPageIsOpen}
				error={error}
				loading={loading}
				isRegister={isRegister}
				setIsRegister={setIsRegister}
			/>
		)
	}

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<Layout
							userEmail={userEmail}
							userName={userName}
							logout={logoutHandler}
							setLoginPageIsOpen={setLoginPageIsOpen}
							setIsRegister={setIsRegister}
							isRegister={isRegister}
						/>
					}
				>
					<Route index element={userEmail ? <SetsPage /> : <HomePage />} />
					<Route path=':setId' element={<SetDetailPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
