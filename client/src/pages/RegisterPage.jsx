import { useDispatch, useSelector } from 'react-redux'
import { registerNewUser } from '../store/user/user-actions'
import { useForm } from 'react-hook-form'
import { selectAllInfo } from '../store/user/user-selectors'
import { Navigate } from 'react-router-dom'

export function RegisterPage() {
    const dispatch = useDispatch()

    // const error = useSelector(selectError)
    // const loading = useSelector(isLoading)
    // const user = useSelector(selectCurrentUser)

    const { error, loading, email: user } = useSelector(selectAllInfo)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        // reset,
        getValues,
    } = useForm({ mode: 'all' })

    const onSubmit = (data) => {
        const { name, mail: email, password } = data
        dispatch(registerNewUser({ name, email, password }))
    }

    if (user) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <label>Имя</label>
                <input
                    type='text'
                    placeholder='Введите имя'
                    maxLength='25'
                    {...register('name', {
                        required: 'Это обязательное поле',
                        minLength: { value: 3, message: 'Минимальная длина поля 3 символа' },
                    })}
                />
                {error && <small>{error}</small>}
                <small>{errors?.name && errors.name.message}</small>
            </section>

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
                <small>{errors?.mail && errors.mail.message}</small>
            </section>

            <section>
                <label>Пароль</label>
                <input
                    type='password'
                    placeholder='Придумайте пароль'
                    maxLength='25'
                    {...register('password', {
                        required: 'Это обязательное поле',
                        minLength: { value: 5, message: 'Минимальная длина поля 5 символов' },
                    })}
                />
                <small>{errors?.password && errors.password.message}</small>
            </section>

            <section>
                <label>Подтвердите пароль</label>
                <input
                    type='password'
                    placeholder='Подтвердите пароль'
                    {...register('confirmPassword', {
                        required: 'Это обязательное поле',
                        validate: (value) => {
                            const { password } = getValues()
                            return password === value || 'Пароль должен совпадать'
                        },
                    })}
                />
                <small>{errors?.confirmPassword && errors.confirmPassword.message}</small>
            </section>

            <section>
                <input
                    type='checkbox'
                    {...register('checkbox', {
                        required: 'Вам нужно дать согласие на обработку персональных данных',
                    })}
                />
                <label>Согласие на обработку персональных данных</label>
                <small>{errors?.checkbox && errors.checkbox.message}</small>
            </section>

            <button type='submit' disabled={!isValid}>
                {loading ? 'Загрузка' : 'Зарегистрироваться'}
            </button>
        </form>
    )
}
