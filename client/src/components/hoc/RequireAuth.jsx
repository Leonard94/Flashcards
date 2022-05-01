import { Navigate, useLocation } from 'react-router-dom'

export function RequireAuth({ children, email }) {
	const location = useLocation()

	if (email === null) {
		console.log('Юзер не авторизован')
		return <Navigate to='/auth' />
	}
	console.log('Пользователю можно')

	return children
}
