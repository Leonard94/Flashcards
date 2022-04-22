import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { DetailAbout } from '../components/SetDetail/DetailAbout'
import { AddNewTerm } from '../components/SetDetail/AddNewTerm'
import { TermList } from '../components/SetDetail/TermList'

import { getTheSet } from '../store/set/set-actions'
import { selectCurrentSet } from '../store/set/set-selectors'

export function SetDetailPage() {
	const dispatch = useDispatch()
	const { setId } = useParams()
	const { title, study: terms = [] } = useSelector(selectCurrentSet)
	const [redirect, setRedirect] = useState(false) // При удалении набора
	const [addTermMode, setAddTermMode] = useState(false)

	useEffect(() => {
		// Запросить информацию о наборе
		dispatch(getTheSet(setId))
	}, [setId, dispatch])

	const study = terms.filter((term) => !term.completed) // На изучении
	const completed = terms.filter((term) => term.completed) // Изучены

	// Переключить режим добавления нового термина
	const toggleAddNewTermMode = () => {
		setAddTermMode(!addTermMode)
	}

	if (redirect) {
		return <Navigate to={'/'} />
	} else if (title) {
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
						<TermList list={study} setId={setId} study={true} />
					) : (
						'Добавить новый термин'
					)}

					{completed.length ? (
						<TermList list={completed} setId={setId} />
					) : null}
				</div>
			</div>
		)
	} else {
		return <h2>Загрузка...</h2>
	}
}
