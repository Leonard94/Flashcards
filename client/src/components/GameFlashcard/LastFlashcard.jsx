export function LastFlashcard({
	learnedTermsCounter,
	continueToStudy,
	resetProgress,
}) {

	return (
		<div className='card'>
			<div className='card-completed'>
				<div className='card-completed__inner'>
					{!learnedTermsCounter ? (
						<>
							<h4>Вы не выучили ни одного термина </h4>
							<h2>Не сдавайтесь и всё получится!</h2>
						</>
					) : (
						<>
							<h2>Поздравляем!</h2>
							<h3>
								Вы только что выучили {learnedTermsCounter} терминов
							</h3>
							<h4>Продолжайте заниматься, чтобы выучить еще 7777</h4>
						</>
					)}
					<button onClick={continueToStudy}>Продолжить изучение</button>
					<br />
					<button onClick={resetProgress}>
						Сбросить прогресс и начать заного
					</button>
				</div>
			</div>
		</div>
	)
}
