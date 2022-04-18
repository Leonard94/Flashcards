import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getSetsList } from '../store/sets/sets-actions'

export function SetsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSetsList())
    }, [dispatch])

    return (
        <>
            <h1>Sets page</h1>
        </>
    )
}
