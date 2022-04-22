import { Term } from './Term'

export function TermList({ list, setId, study }) {
	return (
		<section
			className={`detail__list ${
				study ? 'detail__list--learning' : 'detail__list--completed'
			}`}
		>
			<h3>
				{study ? 'На изучении' : 'Изучено'} ({list.length})
			</h3>

			<ul className='term-list'>
				{list.map((term) => (
					<Term key={term._id} setId={setId} {...term} />
				))}
			</ul>
		</section>
	)
}
