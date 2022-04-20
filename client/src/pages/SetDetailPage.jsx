import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { AddNewWord } from '../components/AddNewWord'
import { EditSet } from '../components/SetDetail/EditSet'
import { Term } from '../components/SetDetail/Term'

import { getTheSet } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'

export function SetDetailPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const { title, study: terms = [], _id: id } = useSelector(selectCurrentSet)
	const [redirect, setRedirect] = useState(false) // При удалении набора
	// const [addMode, setAddMode] = useState(false)

	const study = terms.filter((term) => !term.completed) // На изучении
	const completed = terms.filter((term) => term.completed) // Изучены

	useEffect(() => {
		dispatch(getTheSet(setId))
	}, [setId, dispatch])

	if (redirect) {
		return <Navigate to={'/'} />
	}

	if (title) {
		return (
			<div className='container--small'>
				<div className='detail'>
					<section className='detail__about'>
						<div className='detail__about-left'>
							<EditSet
								title={title}
								id={id}
								setRedirect={setRedirect}
							/>
							<div className='detail__about-allcounter'>
								{terms.length} терминов
							</div>
						</div>
						<div className='detail__about-right'>
							<button className='btn btn--solid'>
								Начать изучение
							</button>
							<br />
							<button className='btn btn--outline'>
								Добавить&nbsp;термин
							</button>
						</div>

						{/* <button style={{ background: 'red' }} onClick={deleteHandle}>
							Удалить набор
						</button> */}
						{/* {addMode && <AddNewWord back={setAddMode} id={id} />}
						{!addMode && (
							<button onClick={() => setAddMode(true)}>
								Добавить слово в набор
							</button>
						)} */}
					</section>

					{study.length ? (
						<section className='detail__list detail__list--learning'>
							<h3>На изучении ({study.length})</h3>
							{terms.length && (
								<ul className='term-list'>
									{terms.map((term) => (
										<Term
											key={term._id}
											setId={setId}
											{...term}
										/>
									))}
								</ul>
							)}
						</section>
					) : (
						<h2>Вы еще не добавили ни одного термина</h2>
					)}

					{/* <section className='detail__list detail__list--completed'>
						<h3>Изучено (77)</h3>
					</section> */}
				</div>
			</div>
		)
	}

	return <h2>Загрузка...</h2>
}
