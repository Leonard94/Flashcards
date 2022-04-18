import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSetsList, addNewSet } from '../store/sets/sets-actions'

export function AddNewSet({ back }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const submit = (e) => {
        e.preventDefault()
        dispatch(addNewSet(title)).then(() => {
            setTitle('')
            dispatch(getSetsList())
            back(false)
        })
    }
    return (
        <>
            <button onClick={() => back(false)}>Свернуть</button>
            <br />
            <h2>Добавить новый набор</h2>
            <br />
            <form onSubmit={submit}>
                <input
                    type='text'
                    placeholder='Введите имя набора'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength='24'
                    minLength='3'
                />
                <button type='submit'>Добавить</button>
            </form>
        </>
    )
}
