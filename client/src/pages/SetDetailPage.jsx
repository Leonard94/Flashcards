import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, useParams } from 'react-router-dom'

import { AddNewWord } from '../components/AddNewWord'
import { SetTitle } from '../components/SetDetail/SetTitle'
import { Term } from '../components/SetDetail/Term'

import { deleteTheSet, getTheSet } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'
import { getSetsList } from '../store/sets/sets-actions'

export function SetDetailPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const { title, study: terms, _id: id } = useSelector(selectCurrentSet)
	const [redirect, setRedirect] = useState(false)
	const [addMode, setAddMode] = useState(false)

	useEffect(() => {
		dispatch(getTheSet(setId))
	}, [setId, dispatch])

	const deleteHandle = () => {
		dispatch(deleteTheSet(id)).then(() => {
			// После успешного удаления
			setRedirect(true) // Редирект на страницу с наборами
			dispatch(getSetsList) // Обновляем список наборов
		})
	}

	if (redirect) {
		return <Navigate to={'/'} />
	}

	if (title) {
		return (
			<div className='container--small'>
				<div className='detail-page'>
					{/* <NavLink to='/'>Вернуться к наборам</NavLink> */}
                        <button className='detail-page__btn btn btn--solid'>Тестирование</button>

					<section className='detail-page__about'>
						<SetTitle title={title} id={id} />
						<button style={{ background: 'red' }} onClick={deleteHandle}>
							Удалить набор
						</button>
						{addMode && <AddNewWord back={setAddMode} id={id} />}
						{!addMode && (
							<button onClick={() => setAddMode(true)}>
								Добавить слово в набор
							</button>
						)}
						<div className='detail-page__about-allcounter'>
							77 терминов
						</div>
					</section>

					<section className='detail-page__list detail-page__list--learning'>
						<h3>На изучении (77)</h3>
						{terms.length && (
							<ul className='term-list'>
								{terms.map((term) => (
									<Term key={term._id} setId={setId} {...term} />
								))}
							</ul>
						)}
					</section>

					{/* <section className='detail-page__list detail-page__list--completed'>
						<h3>Изучено (77)</h3>
						<ul className='term-list'>
							<li className='term-list__item'>
								<span>Props</span>
								<span>Реквизит</span>
								<button>редактировать</button>
							</li>
							<li className='term-list__item'>
								<span>Inherit</span>
								<span>Наследовать</span>
								<button>редактировать</button>
							</li>
							<li className='term-list__item'>
								<span>Observer</span>
								<span>Наблюдатель</span>
								<button>редактировать</button>
							</li>
						</ul>
					</section> */}

				</div>
			</div>
		)
	}

	return <h2>Загрузка...</h2>
}
