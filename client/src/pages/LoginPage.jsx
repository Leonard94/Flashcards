import { useState } from 'react'

import { Auth } from '../components/Login/Auth'
import { Register } from '../components/Login/Register'

export function LoginPage() {
	const [isRegister, setIsRegister] = useState(false)

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
					{!isRegister && <Auth />}
					{isRegister && <Register />}
				</section>
			</div>
		</div>
	)
}
