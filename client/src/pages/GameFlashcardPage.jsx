import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Flashcard } from '../components/GameFlashcard/Flashcard'
import { getTheSetListOfTerms } from '../store/flashcard/flashcard-actions'

import iconBack from '../assets/icon/icon__back.svg'

export function GameFlashcardPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const [currentWord, setCurrentWord] = useState(0)

	const { list, error, loading } = useSelector((state) => state.flashcard)

	useEffect(() => {
		dispatch(getTheSetListOfTerms(setId))
	}, [setId, dispatch])

	const nextCurrentWord = () => {
		setCurrentWord(currentWord + 1)
	}

	return (
		<div className='game-flashcard'>
			{!list.length && <h2>Loading</h2>}
			{list.length && (
				<div className='game-flashcard__body'>
					<Flashcard
						key={list[currentWord].idWord}
						{...list[currentWord]}
					/>
					<div className='game-flashcard__btn-row'>
						<button onClick={nextCurrentWord}>Учить ещё</button>
						<button onClick={nextCurrentWord}>Знаю</button>
					</div>
				</div>
			)}
		</div>
	)
}
