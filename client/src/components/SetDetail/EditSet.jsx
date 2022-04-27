import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteTheSet, renameTheSet } from '../../store/set/set-actions'
import { getSetsList } from '../../store/sets/sets-actions'

import { DropdownEditSet } from './DropdownEditSet'

export function EditSet({ title, id, setRedirect }) {
	const dispatch = useDispatch()
	const [name, setName] = useState(title)
	const [editModeForTitle, setEditModeForTitle] = useState(false)

	const handlerRename = (e) => {
		e.preventDefault()

		if (title !== name) {
			// Если изменили название набора
			const data = { setId: id, title: name }
			dispatch(renameTheSet(data)).then(() => {
				setEditModeForTitle(false)
			})
		} else {
			setEditModeForTitle(false)
		}
	}

	const deleteSetHandle = () => {
		dispatch(deleteTheSet(id)).then(() => {
			setRedirect(true)
			dispatch(getSetsList)
		})
	}

	return (
		<div className='detail__about-title'>
			{!editModeForTitle && (
				<span>
					<h1>{title}</h1>
					<DropdownEditSet
						setEditModeForTitle={setEditModeForTitle}
						deleteSetHandle={deleteSetHandle}
					/>
				</span>
			)}

			{editModeForTitle && (
				<form className='detail__about-form' onSubmit={handlerRename}>
					<input
						autoFocus
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<span>
						<button
							type='button'
							className='detail__about-btn detail__about-btn--back'
							onClick={() => {
								setEditModeForTitle(false)
								setName(title)
							}}
						>
							назад
						</button>
						<button
							className='detail__about-btn detail__about-btn--ok'
							type='submit'
						>
							принять
						</button>
					</span>
				</form>
			)}
		</div>
	)
}
