import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { Auth } from '../components/Login/Auth'
import { Register } from '../components/Login/Register'
import { selectAllInfo } from '../store/user/user-selectors'

export function LoginPage() {
	const [isRegister, setIsRegister] = useState(false)
	const { error, loading, email: user } = useSelector(selectAllInfo)

	if (user) {
		return <Navigate to={'/'} />
	}

	return (
		<div className='auth'>
			<div className='auth__container'>
				<div className='auth__btn-row'>
					<button
						className={`auth__btn ${!isRegister && 'auth__btn--active'}`}
						onClick={() => setIsRegister(false)}
					>
						Войти
					</button>

					<button
						className={`auth__btn ${isRegister && 'auth__btn--active'}`}
						onClick={() => setIsRegister(true)}
					>
						Регистрация
					</button>
				</div>
				<section className='auth-form__body'>
					{!isRegister && <Auth error={error} loading={loading} />}
					{isRegister && (
						<Register
							error={error}
							loading={loading}
							setIsRegister={setIsRegister}
						/>
					)}
				</section>
			</div>
		</div>
	)
}
