import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getTheSet, removeTheTerm, renameTheTerm } from '../../store/set/set-actions'
import iconDetail from '../../assets/icon/icon-detail.svg'

export function Term({ front, back, setId, _id: termId }) {
	const [editMode, setEditMode] = useState(false)
	const [localFront, setLocalFront] = useState(front)
	const [localBack, setLocalBack] = useState(back)

	const dispatch = useDispatch()

	const toggleEditMode = () => {
		setEditMode(!editMode)
	}
	const onSubmit = (e) => {
		e.preventDefault()
		if (front === localFront && back === localBack) {
			// Если ничего не изменилось, а нажали сохранить
			toggleEditMode()
		} else {
			// Если что-то поменяли
			const data = { setId, termId, front: localFront, back: localBack }
			dispatch(renameTheTerm(data)).then(() => {
				// Обновляем список терминов
				dispatch(getTheSet(setId))
				toggleEditMode()
			})
		}
	}
	const deleteTheTerm = () => {
		const data = { setId, termId }
		dispatch(removeTheTerm(data)).then(() => {
			dispatch(getTheSet(setId))
			toggleEditMode()
		})
	}

	return (
		<li className='term-list__item'>
			{!editMode && (
				<div className='term-list__term'>
					<div className='term-list__inner-front'>{front}</div>{' '}
					<div className='term-list__inner-back'>{back}</div>
					{/* <button onClick={toggleEditMode}>edit</button> */}
					<img className='term-list__img' src={iconDetail} alt='detail' />
				</div>
			)}

			{editMode && (
				<>
					<button onClick={toggleEditMode}>назад</button>
					<form onSubmit={onSubmit}>
						<input
							value={localFront}
							onChange={(e) => setLocalFront(e.target.value)}
						/>
						<input
							value={localBack}
							onChange={(e) => setLocalBack(e.target.value)}
						/>
						<button
							onClick={deleteTheTerm}
							style={{ background: 'red' }}
						>
							Удалить термин
						</button>
						<button type='submit'>ок</button>
					</form>
				</>
			)}
		</li>
	)
}
