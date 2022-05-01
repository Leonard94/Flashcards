import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SetsPage } from './pages/SetsPage'
import { Layout } from './components/Layout/Layout'

import { logout } from './store/user/user-actions'
import { selectAllInfoAboutUser } from './store/user/user-selectors'
import { SetDetailPage } from './pages/SetDetailPage'
import { GameFlashcardPage } from './pages/GameFlashcardPage'
import { RequireAuth } from './components/hoc/RequireAuth'

function App() {
	const dispatch = useDispatch()

	const { email, name, loading } = useSelector(selectAllInfoAboutUser)

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
							userEmail={email}
							userName={name}
							logout={logoutHandler}
						/>
					}
				>
					<Route index element={email ? <SetsPage /> : <HomePage />} />
					<Route
						path=':setId'
						element={
							<RequireAuth email={email}>
								<SetDetailPage />
							</RequireAuth>
						}
					/>
					<Route
						path=':setId/game-flashcard'
						element={
							<RequireAuth email={email}>
								<GameFlashcardPage />
							</RequireAuth>
						}
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
