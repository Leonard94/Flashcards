import { Auth } from '../components/Login/Auth'
import { Register } from '../components/Login/Register'

import iconClose from '../assets/icon/icon__close.svg'

export function LoginPage(props) {
	const { setLoginPageIsOpen, setIsRegister, isRegister, error, loading } = props

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
