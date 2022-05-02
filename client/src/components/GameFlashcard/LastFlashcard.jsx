export function LastFlashcard({ learnedTermsCounter, continueToStudy }) {
	// Пока идёт синхронизация redux и сервера - показывать загрузку

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
					<button onClick={continueToStudy}>Продолжить</button>
					<br />
					<button>Начать заново</button>
				</div>
			</div>
		</div>
	)
}
