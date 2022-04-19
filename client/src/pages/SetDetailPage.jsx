import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, useParams } from 'react-router-dom'

import { AddNewWord } from '../components/AddNewWord'
import { SetTitle } from '../components/SetDetail/SetTitle'
import { Term } from '../components/SetDetail/Term'

import { deleteTheSet, getTheSet } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'
import { getSetsList } from '../store/sets/sets-actions'

export function SetDetailPage() {
    const dispatch = useDispatch()
    const { setId } = useParams()
    const { title, study: terms, _id: id } = useSelector(selectCurrentSet)
    const [redirect, setRedirect] = useState(false)
    const [addMode, setAddMode] = useState(false)

    useEffect(() => {
        dispatch(getTheSet(setId))
    }, [setId, dispatch])

    const deleteHandle = () => {
        dispatch(deleteTheSet(id)).then(() => {
            // После успешного удаления
            setRedirect(true) // Редирект на страницу с наборами
            dispatch(getSetsList) // Обновляем список наборов
        })
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    if (title) {
        return (
            <>
                <NavLink to='/'>Вернуться к наборам</NavLink>
                <SetTitle title={title} id={id} />
                <button style={{ background: 'red' }} onClick={deleteHandle}>
                    Удалить набор
                </button>
                {addMode ? (
                    <AddNewWord back={setAddMode} id={id} />
                ) : (
                    <button onClick={() => setAddMode(true)}>Добавить слово в набор</button>
                )}

                {!terms.length ? (
                    <>
                        <h2 style={{ fontSize: '24px' }}>В наборе еще нет слов</h2>
                    </>
                ) : (
                    <>
                        <h6>На изучении:</h6>
                        <ul>
                            {terms.map((term) => (
                                <Term key={term._id} setId={setId} {...term} />
                            ))}
                        </ul>
                    </>
                )}
            </>
        )
    }

    return <h2>Загрузка...</h2>
}
