import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Flashcard } from '../components/GameFlashcard/Flashcard'
import { getTheSetListOfTerms } from '../store/flashcard/flashcard-actions'

export function GameFlashcardPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const [currentTerm, setCurrentTerm] = useState(0)
	const [flip, setFlip] = useState(false)

	const { list, error, loading } = useSelector((state) => state.flashcard)

	const studyTerm = list.filter((term) => term.completed === false)

	useEffect(() => {
		dispatch(getTheSetListOfTerms(setId))
	}, [setId, dispatch])

	const nextCurrentTerm = () => {
		setFlip(false)
		setCurrentTerm(currentTerm + 1)
	}

	return (
		<div className='game-flashcard'>
			{!list.length && <h2>Loading</h2>}
			{list.length && (
				<div className='game-flashcard__body'>
					<Flashcard
						key={studyTerm[currentTerm].idWord}
						{...studyTerm[currentTerm]}
						flip={flip}
						setFlip={setFlip}
						currentTerm={currentTerm}
						allTerm={studyTerm.length}
					/>
					<div className='game-flashcard__btn-row'>
						<button onClick={nextCurrentTerm}>Учить ещё</button>
						<button onClick={nextCurrentTerm}>Знаю</button>
					</div>
				</div>
			)}
		</div>
	)
}
