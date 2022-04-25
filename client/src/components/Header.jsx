import { NavLink } from 'react-router-dom'

import logo from '../assets/img/Logo.svg'
import userLogo from '../assets/img/img-profile.svg'

export function Header({
	userEmail,
	userName,
	logout,
	setLoginPageIsOpen,
	setIsRegister,
}) {
	return (
		<header className='header'>
			<div className='container'>
				<div className='header__inner'>
					<NavLink to='/' className='header__logo'>
						<img src={logo} alt='logo' />
					</NavLink>
					<nav className='menu'>
						<ul className='menu__list'>
							{/* Если авторизованы */}
							{userEmail ? (
								<li>
									<NavLink to='/' className='menu__link'>
										Мои наборы
									</NavLink>
								</li>
							) : (
								<li>
									<NavLink to='/' className='menu__link'>
										Главная
									</NavLink>
								</li>
							)}
						</ul>
					</nav>
					<ul className='header__auth'>
						{/* Если авторизованы */}
						{userEmail ? (
							<>
								<li className='header-auth__user'>
									<img src={userLogo} alt='avatar' />
									<span>{userName}</span>
								</li>
								<li className='header-auth__logout'>
									<button onClick={logout}>Выйти</button>
								</li>
							</>
						) : (
							<>
								<li className='header-auth__login'>
									<button
										className='btn btn--outline'
										onClick={() => {
											setLoginPageIsOpen(true)
											setIsRegister(false)
										}}
									>
										Войти
									</button>
								</li>
								<li className='header-auth__register'>
									<button
										className='btn btn--solid'
										onClick={() => {
											setLoginPageIsOpen(true)
											setIsRegister(true)
										}}
									>
										Регистрация
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</header>
	)
}
