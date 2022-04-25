import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getTheSet, removeTheTerm, renameTheTerm } from '../../store/set/set-actions'

import iconDetail from '../../assets/icon/icon__detail.svg'
import iconCompleted from '../../assets/icon/icon__completed.svg'
import iconClose from '../../assets/icon/icon__close.svg'

import { DropDownEditTerm } from './DropDownEditTerm'

export function Term({ front, back, setId, _id: termId, toggleCompleted }) {
	const [localFront, setLocalFront] = useState(front)
	const [localBack, setLocalBack] = useState(back)
	const [editMode, setEditMode] = useState(false)
	const [isOpenMenu, setIsOpenMenu] = useState(false)

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
		setIsOpenMenu(false)
		const data = { setId, termId }
		dispatch(removeTheTerm(data)).then(() => {
			dispatch(getTheSet(setId))
			toggleEditMode()
		})
	}

	const toggleCompletedTheTerm = () => {
		toggleCompleted(termId)
		setIsOpenMenu(false)
	}

	return (
		<li className='term'>
			{isOpenMenu && (
				<DropDownEditTerm
					setIsOpenMenu={setIsOpenMenu}
					toggleEditMode={toggleEditMode}
					deleteTheTerm={deleteTheTerm}
					toggleCompletedTheTerm={toggleCompletedTheTerm}
				/>
			)}

			<div className={`term__body ${editMode ? 'term__body--editmode' : ''}`}>
				{!editMode && (
					<div className='term__item'>
						<div className='term-item__front'>{front}</div>
						<div className='term-item__back'>{back}</div>
						<img
							onClick={setIsOpenMenu}
							className='term-item__img'
							src={iconDetail}
							alt='detail'
						/>
					</div>
				)}

				{/* Эта часть есть в AddNewTerm. Зарефакторить! */}

				{editMode && (
					<form
						onSubmit={onSubmit}
						className='term__item term-item__inputs'
					>
						<textarea
							className='term-item__front term-item__input'
							placeholder={front}
							value={localFront}
							spellCheck='false'
							autoFocus
							onChange={(e) => setLocalFront(e.target.value)}
						/>
						<textarea
							className='term-item__back term-item__input'
							placeholder={back}
							value={localBack}
							spellCheck='false'
							onChange={(e) => setLocalBack(e.target.value)}
						/>
					</form>
				)}
			</div>
			<div className='term__btn-row'>
				<button className='term-btn' onClick={() => toggleEditMode()}>
					<img
						className='term-item__input-img'
						src={iconClose}
						alt='detail'
					/>
				</button>
				<button className='term-btn' onClick={onSubmit}>
					<img
						className='term-item__input-img'
						type='submit'
						src={iconCompleted}
						alt='detail'
					/>
				</button>
			</div>
		</li>
	)
}
