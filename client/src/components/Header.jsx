import { NavLink } from 'react-router-dom'

export function Header({ userEmail, userName, logout }) {
    return (
        <header className='header'>
            <div className='header__container container'>
                <div className='header__inner'>
                    <NavLink to='/' className='header__logo'>
                        Logotype
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
                                    <h5>
                                        Hello, <span>{userName}</span>
                                    </h5>
                                </li>
                                <li className='header-auth__logout'>
                                    <button onClick={logout}>Выйти</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='header-auth__login'>
                                    <NavLink to='/login' className='menu__link'>
                                        Вход
                                    </NavLink>
                                </li>
                                <li className='header-auth__register'>
                                    <NavLink to='/register' className='menu__link'>
                                        Зарегистрироваться
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}
