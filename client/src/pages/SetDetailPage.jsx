import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { AddNewWord } from '../components/AddNewWord'

import { deleteTheSet, getTheSet } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'
import { getSetsList } from '../store/sets/sets-actions'

export function SetDetailPage() {
    const dispatch = useDispatch()
    const { setId } = useParams()
    const { title, study: words, _id: id } = useSelector(selectCurrentSet)
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
                <h1>{title}</h1>
                <button style={{ background: 'red' }} onClick={deleteHandle}>
                    Удалить набор
                </button>
                <br />
                {addMode ? (
                    <AddNewWord back={setAddMode} id={id} />
                ) : (
                    <button onClick={() => setAddMode(true)}>Добавить</button>
                )}

                {!words.length ? (
                    <>
                        <h2 style={{ fontSize: '24px' }}>В наборе еще нет слов</h2>
                    </>
                ) : (
                    <>
                        <h6>На изучении:</h6>
                        <ul>
                            {words.map((word) => (
                                <li key={word._id}>
                                    <span>{word.front}</span> | <span>{word.back}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </>
        )
    }

    return <h2>Загрузка...</h2>
}
