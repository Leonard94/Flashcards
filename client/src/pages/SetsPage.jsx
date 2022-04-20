import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AddNewSet } from '../components/AddNewSet'
import { SetsCard } from '../components/SetsCard'

import { getSetsList } from '../store/sets/sets-actions'
import { selectSets } from '../store/sets/sets-selectors'

export function SetsPage() {
    const dispatch = useDispatch()

    const sets = useSelector(selectSets)


    useEffect(() => {
        dispatch(getSetsList())
    }, [dispatch])

    return (
        <div className='container'>
            {/* <h2>Мои наборы</h2> */}
            {/* {addMode && <AddNewSet back={setAddMode} />} */}
            {/* {!addMode && <button onClick={() => setAddMode(true)}>Добавить новый набор</button>} */}
            {!sets.length ? (
                <h2>Вы еще не добавили ни одного набора</h2>
            ) : (
                <ul className='sets-card__list'>
                    {sets.map((set) => (
                        <SetsCard key={set._id} {...set} />
                    ))}
                    <AddNewSet />
                </ul>
            )}
        </div>
    )
}
