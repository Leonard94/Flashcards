import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getSetsList, addNewSet } from '../store/sets/sets-actions'
import addIcon from '../assets/icon/icon__add.svg'

export function AddNewSet() {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [addMode, setAddMode] = useState(false)

	const submit = (e) => {
		e.preventDefault()
		dispatch(addNewSet(title)).then(() => {
			setTitle('')
			dispatch(getSetsList())
			toggleAddMode(false)
		})
	}

	const toggleAddMode = () => {
		setAddMode(!addMode)
	}

	return (
		<div className='add-set'>
			<div className='add-set__body'>
				{addMode && (
					<form className='add-set__form' onSubmit={submit}>
						<input
							type='text'
							placeholder='Введите имя набора'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							maxLength='35'
							minLength='2'
						/>
						<div className='add-set__btn-row'>
							<button
								type='button'
								className='add-set__btn add-set__btn--remove'
								onClick={toggleAddMode}
							>
								Отмена
							</button>
							<button
								className='add-set__btn add-set__btn--submit'
								type='submit'
							>
								Добавить
							</button>
						</div>
					</form>
				)}
				{!addMode && (
					<div className='add-set__add-body' onClick={toggleAddMode}>
						<img
							className='add-set__img'
							src={addIcon}
							alt='add new set'
						/>
						<h6 className='add-set__subtitle'>Добавить новый набор</h6>
					</div>
				)}
			</div>
		</div>
	)
}
