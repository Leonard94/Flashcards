import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { deleteTheSet, getTheSet } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'
import { getSetsList } from '../store/sets/sets-actions'

export function SetDetailPage() {
    const dispatch = useDispatch()
    const { setId } = useParams()
    const { title, study: words, _id: id } = useSelector(selectCurrentSet)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        dispatch(getTheSet(setId))
    }, [setId, dispatch])

    const deleteHandle = () => {
        dispatch(deleteTheSet(id)).then(() => {
            // После успешного удаления
            setRedirect(true) // Редирект на страницу с наборами
            dispatch(getSetsList) // Обновляем список наборов
            // Т.к. удаление это редкость, потому делаем так, а не через размонтирование страницы наборов
        })
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    if (title) {
        return (
            <>
                <h1>{title}</h1>
                <button onClick={deleteHandle}>Удалить набор</button>
                {!words.length ? (
                    <h4>Вы еще не добавили слова в набор</h4>
                ) : (
                    <>
                        <h6>На изучении:</h6>
                        <ul>
                            {words.map((word) => (
                                <li key={word.idWord}>
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
