import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { registerNewUser } from '../../store/user/user-actions'

export function Register({ error, loading, setIsRegister }) {
	const dispatch = useDispatch()

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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className='auth-form__section'>
				<label>Имя</label>
				<input
					type='text'
					placeholder='Полиглот'
					maxLength='25'
					{...register('name', {
						required: 'Это обязательное поле',
						minLength: {
							value: 3,
							message: 'Минимальная длина поля 3 символа',
						},
					})}
				/>
				<small>{errors?.name && errors.name.message}</small>
			</section>

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
				{error && <small>{error}</small>}
				<small>{errors?.mail && errors.mail.message}</small>
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
			</section>

			<section className='auth-form__section'>
				<label>Подтверждение пароля</label>
				<input
					type='password'
					placeholder='**********'
					{...register('confirmPassword', {
						required: 'Это обязательное поле',
						validate: (value) => {
							const { password } = getValues()
							return password === value || 'Пароль должен совпадать'
						},
					})}
				/>
				<small>
					{errors?.confirmPassword && errors.confirmPassword.message}
				</small>
			</section>

			<section className='auth-form__section'>
				<label className='auth-form__checkbox-row'>
					<input
						type='checkbox'
						{...register('checkbox', {
							required:
								'Вам нужно дать согласие на обработку персональных данных',
						})}
					/>
					Согласие на обработку персональных данных
				</label>
				<small>{errors?.checkbox && errors.checkbox.message}</small>
			</section>

			<div className='auth-form__btn-row'>
				<button
					className='btn btn--solid'
					type='submit'
					disabled={!isValid || loading}
				>
					{loading ? 'Загрузка' : 'Зарегистрироваться'}
				</button>
				<button
					onClick={() => setIsRegister(false)}
					className='btn btn--outline'
					type='submit'
				>
					Уже есть учётная запись? <span>Войдите</span>
				</button>
			</div>
		</form>
	)
}
