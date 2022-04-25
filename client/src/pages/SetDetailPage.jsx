import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { DetailAbout } from '../components/SetDetail/DetailAbout'
import { AddNewTerm } from '../components/SetDetail/AddNewTerm'
import { TermList } from '../components/SetDetail/TermList'

import { getTheSet, toggleCompletedTheTerm } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'

export function SetDetailPage() {
	const { setId } = useParams()

	const dispatch = useDispatch()
	const { title, study: terms = [] } = useSelector(selectCurrentSet)
	const [redirect, setRedirect] = useState(false) // Если удаляем набор - редирект на главную
	const [addTermMode, setAddTermMode] = useState(false)

	useEffect(() => {
		// Запросить информацию о наборе
		dispatch(getTheSet(setId))
	}, [setId, dispatch])

	const study = terms.filter((term) => !term.completed).reverse() // На изучении
	const completed = terms.filter((term) => term.completed) // Изучены

	// Переключить режим добавления термина
	const toggleAddNewTermMode = () => {
		setAddTermMode(!addTermMode)
	}

	// Переключить выполнение термина
	const toggleCompleted = (termId) => {
		const data = { setId, termId }
		dispatch(toggleCompletedTheTerm(data))
	}

	if (redirect) {
		return <Navigate to={'/'} />
	}

	if (title) {
		return (
			<div className='container--small'>
				<div className='detail'>
					<DetailAbout
						title={title}
						setId={setId}
						setRedirect={setRedirect}
						lengthOfSet={terms.length}
						addTermMode={addTermMode}
						toggleAddNewTermMode={toggleAddNewTermMode}
					/>

					{addTermMode && (
						<AddNewTerm goBack={toggleAddNewTermMode} id={setId} />
					)}

					{study.length ? (
						<TermList
							list={study}
							setId={setId}
							study={true}
							toggleCompleted={toggleCompleted}
						/>
					) : (
						'Добавить новый термин'
					)}

					{completed.length ? (
						<TermList
							list={completed}
							setId={setId}
							toggleCompleted={toggleCompleted}
						/>
					) : null}
				</div>
			</div>
		)
	} else {
		return <h2>Загрузка...</h2>
	}
}
