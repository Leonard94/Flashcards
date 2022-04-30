export function Flashcard({ front, back, flip, setFlip, currentTerm, allTerm }) {
	return (
		<>
			<div
				onClick={() => setFlip(!flip)}
				className={`card ${flip ? 'active' : ''}`}
			>
				<span className='card__counter'>
					{currentTerm + 1} / {allTerm}
				</span>
				<div className='card__front'>{front}</div>
				<div className='card__back'>{back}</div>
			</div>
		</>
	)
}
