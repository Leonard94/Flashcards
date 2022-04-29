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
		<main>
			<div className='container'>
				<ul className='sets-card__list'>
					{!sets.length ? (
						<>
							<h2>Вы еще не добавили ни одного набора</h2>
							<AddNewSet />
						</>
					) : (
						<>
							{sets.map((set) => (
								<SetsCard key={set._id} {...set} />
							))}
							<AddNewSet />
						</>
					)}
				</ul>
			</div>
		</main>
	)
}
