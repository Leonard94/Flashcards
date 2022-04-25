import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { login } from '../../store/user/user-actions'

export function Auth({ error, loading }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'all' })

	const dispatch = useDispatch()

	const onSubmit = (data) => {
		const { mail: email, password } = data
		dispatch(login({ email, password }))
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
			<section className='auth-form__section'>
				<label>Почта</label>
				<input
					type='email'
					placeholder='poliglot@gmail.com'
					{...register('mail', {
						required: 'Это обязательное поле',
						minLength: {
							value: 5,
							message: 'Минимальная длина поля 5 символов',
						},
						pattern: {
							value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Введите корректную почту',
						},
					})}
				/>
				<small>{errors?.mail && errors.mail.message}</small>
				{error && <small>{error}</small>}
			</section>

			<section className='auth-form__section'>
				<label>Пароль</label>
				<input
					type='password'
					placeholder='**********'
					maxLength='25'
					{...register('password', {
						required: 'Это обязательное поле',
						minLength: {
							value: 5,
							message: 'Минимальная длина поля 5 символов',
						},
					})}
				/>
				<small>{errors?.password && errors.password.message}</small>
				{error && <small>{error}</small>}
			</section>

			<div className='auth-form__btn-row'>
				<button className='btn btn--solid' type='submit' disabled={!isValid || loading}>
					{loading ? 'Загрузка' : 'Войти'}
				</button>
			</div>
		</form>
	)
}
