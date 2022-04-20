import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { addNewWordToTheSet, getTheSet } from '../store/set/set-actions'

export function AddNewWord({ back, id }) {
    const dispatch = useDispatch()

    const submit = (data) => {
        dispatch(addNewWordToTheSet({ ...data, setId: id, completed: false })).then(() => {
            reset()
            back(false)
            dispatch(getTheSet(id))
        })
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' })

    return (
        <>
            <button onClick={() => back(false)}>Назад</button>
            <form onSubmit={handleSubmit(submit)}>
                <section>
                    <label>Лицевая сторона</label>
                    <br />
                    <input
                        type='text'
                        placeholder='Введите текст'
                        maxLength='100'
                        {...register('front', {
                            required: 'Это обязательное поле',
                            minLength: { value: 1, message: 'Минимальная длина поля 1 символ' },
                        })}
                    />
                    {errors?.mail && errors.mail.message}
                </section>
                <section>
                    <label>Оборотная сторона</label>
                    <br />
                    <input
                        type='text'
                        placeholder='Введите текст'
                        maxLength='100'
                        {...register('back', {
                            required: 'Это обязательное поле',
                            minLength: { value: 1, message: 'Минимальная длина поля 1 символ' },
                        })}
                    />
                    {errors?.mail && errors.mail.message}
                </section>
                <button type='submit' disabled={!isValid} style={{ background: 'orange' }}>
                    Добавить
                </button>
            </form>
        </>
    )
}
