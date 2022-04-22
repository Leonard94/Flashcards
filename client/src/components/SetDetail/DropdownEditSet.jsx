import { useEffect, useState, useRef } from 'react'

import iconSettings from '../../assets/icon/icon-settings.svg'
import iconEdit from '../../assets/icon/icon-edit2.svg'
import iconRemove from '../../assets/icon/icon__remove.svg'

export function DropdownEditSet({ setEditModeForTitle, deleteSetHandle }) {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef()

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleOnClick = (e) => {
		// Если нажали не по меню
		if (menuRef.current && !menuRef.current.contains(e.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleOnClick)
		return () => {
			document.removeEventListener('mousedown', handleOnClick)
		}
	})

	const renameTitle = () => {
		setEditModeForTitle(true)
		toggleMenu()
	}

	return (
		<div className='dropdown'>
			<img
				className='dropdown__img'
				onClick={toggleMenu}
				src={iconSettings}
				alt='Редактировать набор'
			/>
			{isOpen && (
				<ul ref={menuRef} className='dropdown__body'>
					<li onClick={renameTitle}>
						<img src={iconEdit} alt='Переименовать' />
						Переименовать
					</li>
					<li>
						<img src={iconRemove} alt='Удалить набор' />
						Сбросить&nbsp;прогресс
					</li>
					<li onClick={() => deleteSetHandle()}>
						<img src={iconRemove} alt='Удалить набор' />
						Удалить набор
					</li>
				</ul>
			)}
		</div>
	)
}
