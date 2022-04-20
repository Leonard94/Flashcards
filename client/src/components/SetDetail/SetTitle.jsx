import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { getTheSet, renameTheSet } from '../../store/set/set-actions'

import iconEdit from '../../assets/icon/icon-edit.svg'

export function SetTitle({ title, id }) {
	const [editMode, setEditMode] = useState(false)
	const [name, setName] = useState(title)

	const dispatch = useDispatch()

	const onSubmit = (e) => {
		e.preventDefault()
		if (title !== name) {
			const data = { setId: id, title: name }
			dispatch(renameTheSet(data)).then(() => {
				setEditMode(false)
				dispatch(getTheSet(id))
			})
		} else {
			setEditMode(false)
		}
	}

	return (
		<div className='detail-page__about-title'>
			{!editMode ? (
				<span>
					<h1>{title}</h1>
					<img
						src={iconEdit}
						alt='edit set title'
						title='Изменить имя набора'
						onClick={() => setEditMode(true)}
					/>
				</span>
			) : (
				<>
					<form onSubmit={onSubmit}>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button onClick={() => setEditMode(false)}>назад</button>
						<button type='submit'>ок</button>
					</form>
				</>
			)}
		</div>
	)
}
