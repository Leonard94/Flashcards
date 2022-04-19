import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTheSet, renameTheTerm } from '../../store/set/set-actions'

export function Term({ front, back, setId, _id: termId }) {
    const [editMode, setEditMode] = useState(false)
    const [localFront, setLocalFront] = useState(front)
    const [localBack, setLocalBack] = useState(back)

    const dispatch = useDispatch()

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (front === localFront && back === localBack) {
            // Если ничего не изменилось, а нажали сохранить
            toggleEditMode()
        } else {
            // Если что-то поменяли
            const data = { setId, termId, front: localFront, back: localBack }
            dispatch(renameTheTerm(data)).then(() => {
                // Обновляем список терминов
                dispatch(getTheSet(setId))
                toggleEditMode()
            })
        }
    }
    const deleteTheTerm = () => {
        // toggleEditMode()
    }

    return (
        <li style={{ marginBottom: '10px' }}>
            {!editMode && (
                <>
                    <span>{front}</span> | <span>{back}</span>
                    <button onClick={toggleEditMode}>редактировать</button>
                </>
            )}

            {editMode && (
                <>
                    <button onClick={toggleEditMode}>назад</button>
                    <form onSubmit={onSubmit}>
                        <input value={localFront} onChange={(e) => setLocalFront(e.target.value)} />
                        <input value={localBack} onChange={(e) => setLocalBack(e.target.value)} />
                        <button type='submit'>ок</button>
                    </form>
                </>
            )}
        </li>
    )
}
