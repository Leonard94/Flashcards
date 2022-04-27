import { useEffect, useRef } from 'react'

import iconRemove from '../../assets/icon/icon__remove.svg'
import iconCompleted from '../../assets/icon/icon__completed.svg'
import iconPen from '../../assets/icon/icon__pen.svg'

export function DropDownEditTerm(props) {
	const { setIsOpenMenu, editTheTerm, deleteTheTerm, toggleCompletedTheTerm } =
		props

	const menuRef = useRef()

	const handleOnClick = (e) => {
		if (menuRef.current && !menuRef.current.contains(e.target)) {
			// Если нажали не по меню
			setIsOpenMenu(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleOnClick)
		return () => {
			document.removeEventListener('mousedown', handleOnClick)
		}
	})

	return (
		<div className='dropdown'>
			<ul ref={menuRef} className='dropdown__body'>
				<li onClick={editTheTerm}>
					<img src={iconPen} alt='Переименовать' />
					Редактировать термин
				</li>
				<li onClick={toggleCompletedTheTerm}>
					<img src={iconCompleted} alt='Удалить набор' />
					Пометить как выполненное
				</li>
				<li onClick={deleteTheTerm}>
					<img src={iconRemove} alt='Удалить набор' />
					Удалить термин
				</li>
			</ul>
		</div>
	)
}
