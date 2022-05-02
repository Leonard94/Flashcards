import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Flashcard } from '../components/GameFlashcard/Flashcard'
import { LastFlashcard } from '../components/GameFlashcard/LastFlashcard'
import {
	getTheSetListOfTermsFromServer,
	setCompleted,
} from '../store/flashcard/flashcard-actions'

export function GameFlashcardPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const [currentTerm, setCurrentTerm] = useState(0)
	const [flip, setFlip] = useState(false)
	const [learnedTermsCounter, setLearnedTermsCounter] = useState(0)

	const { termList, error, loading } = useSelector((state) => state.flashcard)

	useEffect(() => {
		dispatch(getTheSetListOfTermsFromServer(setId))
	}, [setId, dispatch])

	const nextCurrentTerm = () => {
		setFlip(false)
		setCurrentTerm(currentTerm + 1)
	}

	const completed = (termId) => {
		setLearnedTermsCounter(learnedTermsCounter + 1)
		dispatch(setCompleted(termId))
		setFlip(false)
		setCurrentTerm(currentTerm + 1)
	}

	const continueToStudy = () => {
		if (learnedTermsCounter === 0) {
			setCurrentTerm(0) // Просто перезапускаем игру
		} else {
			// Показать загрузку и отправить обновлённый список на сервер
		}
	}

	const restart = () => {
		// Отправляем запрос на сервер. Перебираем все термины и каждому меняем completed на false
	}

	return (
		<div className='game-flashcard'>
			<div className='game-flashcard__body'>
				{!termList.length && <h2>Loading</h2>}
				{termList.length && currentTerm < termList.length ? (
					<>
						<Flashcard
							{...termList[currentTerm]}
							flip={flip}
							setFlip={setFlip}
							currentTerm={currentTerm}
							length={termList.length}
						/>
						<div className='game-flashcard__btn-row'>
							<button onClick={nextCurrentTerm}>Учить ещё</button>
							<button
								onClick={() => completed(termList[currentTerm]._id)}
							>
								Знаю
							</button>
						</div>
					</>
				) : (
					<LastFlashcard
						learnedTermsCounter={learnedTermsCounter}
						continueToStudy={continueToStudy}
						restart={restart}
					/>
				)}
			</div>
		</div>
	)
}
