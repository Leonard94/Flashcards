import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from 'react-hook-form'

import { login } from '../store/user/user-actions'
import { selectAllInfo } from '../store/user/user-selectors'

export function LoginPage() {
    const dispatch = useDispatch()
    const { error, loading, email: user } = useSelector(selectAllInfo)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' })

    const onSubmit = (data) => {
        const { mail: email, password } = data
        dispatch(login({ email, password }))
    }

    if (user) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <h2>Войти в систему</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <label>Почта</label>
                    <input
                        placeholder='Введите почту'
                        {...register('mail', {
                            required: 'Это обязательное поле',
                            minLength: { value: 5, message: 'Минимальная длина поля 5 символов' },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Введите корректную почту',
                            },
                        })}
                    />
                    {/* Зарефакторить код ниже */}
                    <small>{errors?.mail && errors.mail.message}</small>
                    {error && <small>{error}</small>}
                </section>

                <section>
                    <label>Пароль</label>
                    <input
                        type='password'
                        placeholder='Введите ваш пароль'
                        maxLength='25'
                        {...register('password', {
                            required: 'Это обязательное поле',
                            minLength: { value: 5, message: 'Минимальная длина поля 5 символов' },
                        })}
                    />
                    {/* Зарефакторить код ниже */}
                    <small>{errors?.password && errors.password.message}</small>
                    {error && <small>{error}</small>}
                </section>

                <button type='submit' disabled={!isValid}>
                    {loading ? 'Загрузка' : 'Войти'}{' '}
                </button>
            </form>
        </>
    )
}
