import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Flashcard } from '../components/GameFlashcard/Flashcard'
import { LastFlashcard } from '../components/GameFlashcard/LastFlashcard'
import {
	getTheSetListOfTermsFromServer,
	resetProgressInTheSetDuringTheGame,
	setCompletedTheTerm,
} from '../store/flashcard/flashcard-actions'

export function GameFlashcardPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const { termList, error, loading } = useSelector((state) => state.flashcard)

	const [currentTerm, setCurrentTerm] = useState(0)
	const [flip, setFlip] = useState(false)
	const [learnedTermsCounter, setLearnedTermsCounter] = useState(0)

	useEffect(() => {
		dispatch(getTheSetListOfTermsFromServer(setId))
	}, [setId, dispatch])

	const studyList = termList.filter((term) => term.completed === false)

	const nextCurrentTerm = () => {
		setFlip(false)
		setCurrentTerm(currentTerm + 1)
	}

	const completed = (termId) => {
		const data = { setId, termId }
		setLearnedTermsCounter(learnedTermsCounter + 1)
		dispatch(setCompletedTheTerm(data))
		setFlip(false)
		setCurrentTerm(currentTerm + 1)
	}

	const continueToStudy = () => {
		if (learnedTermsCounter === 0) {
			setCurrentTerm(0) // Перезапуск игры
		} else {
			dispatch(getTheSetListOfTermsFromServer(setId))
		}
	}

	const resetProgress = () => {
		dispatch(resetProgressInTheSetDuringTheGame(setId)).then(() => {
			setCurrentTerm(0)
		})
	}

	if (loading) {
		return (
			<div className='container'>
				<h2>Loading...</h2>
			</div>
		)
	}

	return (
		<div className='game-flashcard'>
			<div className='game-flashcard__body'>
				{studyList.length && currentTerm < studyList.length ? (
					<>
						<Flashcard
							{...studyList[currentTerm]}
							flip={flip}
							setFlip={setFlip}
							currentTerm={currentTerm}
							length={studyList.length}
						/>
						<div className='game-flashcard__btn-row'>
							<button onClick={nextCurrentTerm}>Учить ещё</button>
							<button
								onClick={() => completed(studyList[currentTerm]._id)}
							>
								Знаю
							</button>
						</div>
					</>
				) : (
					<LastFlashcard
						learnedTermsCounter={learnedTermsCounter}
						continueToStudy={continueToStudy}
						resetProgress={resetProgress}
					/>
				)}
			</div>
		</div>
	)
}
