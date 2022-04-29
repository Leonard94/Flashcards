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
import { GameFlashcardPage } from './pages/GameFlashcardPage'

function App() {
	const dispatch = useDispatch()

	const {
		email: userEmail,
		name: userName,
		loading,
	} = useSelector(selectAllInfoAboutUser)

	useEffect(() => {
		// Проверяем авторизован ли пользователь
		if (userEmail === null && !loading) {
			// Если userEmail пустой и нет загрузки, касающейся пользователя
			dispatch(checkIsAuthUser())
		}
	})

	const logoutHandler = () => {
		dispatch(logout())
		// редирект на главную
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
						/>
					}
				>
					<Route index element={userEmail ? <SetsPage /> : <HomePage />} />
					<Route path=':setId' element={<SetDetailPage />} />
					<Route
						path=':setId/game-flashcard'
						element={<GameFlashcardPage />}
					/>
					<Route path='auth' element={<LoginPage isRegister={false} />} />
					<Route
						path='register'
						element={<LoginPage isRegister={true} />}
					/>
				</Route>
			</Routes>
		</>
	)
}

export default App
