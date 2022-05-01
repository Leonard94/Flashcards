import { Navigate, useLocation } from 'react-router-dom'

export function RequireAuth({ children, email }) {
	const location = useLocation()

	if (email === null) {
		return <Navigate to='/auth' state={{ from: location }} />
	}

	return children
}
