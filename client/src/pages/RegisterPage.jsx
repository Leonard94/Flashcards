import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../store/user/user-actions'

export function RegisterPage() {
    const [mailValue, setMailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const dispatch = useDispatch()

    const handlerForm = (e) => {
        e.preventDefault()
        const data = { email: mailValue, password: passwordValue }
        dispatch(register(data))
    }

    // [] если такой пользователь уже есть - сообщить
    // [] валидировать форму

    return (
        <form onSubmit={(e) => handlerForm(e)}>
            <input
                type='text'
                placeholder='Введите почту'
                value={mailValue}
                onChange={(e) => setMailValue(e.target.value)}
            />
            <br />
            <input
                type='password'
                placeholder='Придумайте пароль'
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
            />
            <br />
            <button type='submit'>Зарегестрироваться</button>
        </form>
    )
}
