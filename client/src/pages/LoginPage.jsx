import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '../store/user/user-actions'

export function LoginPage() {
    const [mailValue, setMailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch()

    const handlerFormLogin = (e) => {
        e.preventDefault()
        const data = { email: mailValue, password: passwordValue }

        dispatch(login(data))
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <h2>LoginPage</h2>
            <form onSubmit={(e) => handlerFormLogin(e)}>
                <input
                    type='text'
                    placeholder='Введите почту'
                    value={mailValue}
                    onChange={(e) => setMailValue(e.target.value)}
                />
                <br />
                <input
                    type='password'
                    placeholder='Введите ваш пароль'
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
                <br />
                <button type='submit'>Войти в систему</button>
            </form>
        </>
    )
}
