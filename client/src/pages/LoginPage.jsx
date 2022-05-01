import { useSelector } from 'react-redux'
import { Navigate, NavLink, useLocation } from 'react-router-dom'

import { Auth } from '../components/Login/Auth'
import { Register } from '../components/Login/Register'

import { selectAllInfoAboutUser } from '../store/user/user-selectors'

import iconClose from '../assets/icon/icon__close.svg'

export function LoginPage({ isRegister = false }) {
	const { email, loading, error } = useSelector(selectAllInfoAboutUser)

	const location = useLocation()
	const fromPage = location.state?.from?.pathname || '/'

	if (email) {
		return <Navigate to={fromPage} />
	}

	return (
		<div className='auth'>
			<div className='auth__container'>
				<div className='auth__btn-row'>
					<NavLink
						to='/auth'
						className={`auth__btn ${!isRegister && 'auth__btn--active'}`}
					>
						Войти
					</NavLink>

					<NavLink
						to='/register'
						className={`auth__btn ${isRegister && 'auth__btn--active'}`}
					>
						Регистрация
					</NavLink>

					<NavLink className='auth__close' to='/'>
						<img
							src={iconClose}
							alt='close register page'
							title={`Закрыть окно ${
								isRegister ? 'регистрации' : 'авторизации'
							}`}
						/>
					</NavLink>
				</div>

				<section className='auth-form__body'>
					{!isRegister && <Auth error={error} loading={loading} />}
					{isRegister && <Register error={error} loading={loading} />}
				</section>
			</div>
		</div>
	)
}
