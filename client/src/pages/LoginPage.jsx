import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Auth } from '../components/Login/Auth'
import { Register } from '../components/Login/Register'
import { selectAllInfo } from '../store/user/user-selectors'

import iconClose from '../assets/icon/icon__close.svg'

export function LoginPage({ setLoginPageIsOpen }) {
	const [isRegister, setIsRegister] = useState(false)
	const { error, loading } = useSelector(selectAllInfo)

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

					<img
						className='auth__close'
						onClick={() => setLoginPageIsOpen(false)}
						src={iconClose}
						alt='close register page'
						title='Закрыть окно регистрации/авторизации'
					/>
				</div>
				<section className='auth-form__body'>
					{!isRegister && (
						<Auth
							setLoginPageIsOpen={setLoginPageIsOpen}
							error={error}
							loading={loading}
						/>
					)}
					{isRegister && (
						<Register
							setLoginPageIsOpen={setLoginPageIsOpen}
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
