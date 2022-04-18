import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getWords } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'

export function SetDetailPage() {
    const dispatch = useDispatch()
    const { setId } = useParams()
    const { title, study: words, _id: id } = useSelector(selectCurrentSet)

    useEffect(() => {
        dispatch(getWords(setId))
    }, [setId, dispatch])

    return (
        <>
            <h1>{title}</h1>
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
