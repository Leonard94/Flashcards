import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTheSet, renameTheSet } from '../../store/set/set-actions'

export function SetTitle({ title, id }) {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(title)

    const dispatch = useDispatch()

    const onSubmit = () => {
        const data = { setId: id, title: name }
        dispatch(renameTheSet(data)).then(() => {
            setEditMode(false)
            dispatch(getTheSet(id))
        })
    }

    return (
        <div style={{ margin: '20px 0' }}>
            {!editMode ? (
                <>
                    <h1>{title}</h1>
                    <button onClick={() => setEditMode(true)}>Редактировать имя набора</button>
                </>
            ) : (
                <>
                    <button onClick={() => setEditMode(false)}>назад</button>
                    <form onSubmit={onSubmit}>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                        <button type='submit'>ок</button>
                    </form>
                </>
            )}
        </div>
    )
}
