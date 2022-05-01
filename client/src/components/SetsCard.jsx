import { NavLink } from 'react-router-dom'

import { declination } from '../helpres'

export function SetsCard({ title, _id: id, study }) {

	return (
		<>
			<li className='sets-card__body'>
				<NavLink to={`/set/${id}`}>
					<h3 className='sets-card__title'>{title}</h3>
					<h6 className='sets-card__subtitle'>
						{study.length} {declination(study.length)}
					</h6>
				</NavLink>
			</li>
		</>
	)
}
