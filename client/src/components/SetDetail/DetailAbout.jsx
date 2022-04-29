import { NavLink } from 'react-router-dom'

import { declination } from '../../helpres'

import { EditSet } from './EditSet'

export function DetailAbout(props) {
	const {
		title,
		setId,
		setRedirect,
		lengthOfSet,
		toggleAddNewTermMode,
		addTermMode,
	} = props

	return (
		<section className='detail__about'>
			<div className='detail__about-left'>
				<EditSet title={title} id={setId} setRedirect={setRedirect} />
				<div className='detail__about-allcounter'>
					{lengthOfSet} {declination(lengthOfSet)}
				</div>
			</div>
			<div className='detail__about-right'>
				<button className='btn btn--solid'>
					<NavLink to={`game-flashcard`}>Начать изучение</NavLink>
				</button>
				<button onClick={toggleAddNewTermMode} className='btn btn--outline'>
					{!addTermMode ? 'Добавить\u00a0термин' : 'Не добавлять'}
				</button>
			</div>
		</section>
	)
}
