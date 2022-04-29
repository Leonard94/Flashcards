import { useState } from 'react'

export function Flashcard({ front = 'Front', back = 'back' }) {
	const [flip, setFlip] = useState()

	return (
		<>
			<div
				onClick={() => setFlip(!flip)}
				className={`card ${flip ? 'active' : ''}`}
			>
				<div className='card__front'>{front}</div>
				<div className='card__back'>{back}</div>
			</div>
		</>
	)
}
