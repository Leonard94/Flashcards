import { useEffect, useRef } from 'react'

import iconEdit from '../../assets/icon/icon__edit.svg'
import iconRemove from '../../assets/icon/icon__remove.svg'

export function DropdownEditSet({ deleteSetHandle, setIsOpenMenu, renameTitle }) {
	const menuRef = useRef()

	const handleOnClick = (e) => {
		if (menuRef.current && !menuRef.current.contains(e.target)) {
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
		<div className='dropdown dropdown-editset'>
			<ul ref={menuRef} className='dropdown__body'>
				<li onClick={renameTitle}>
					<img src={iconEdit} alt='Переименовать' />
					Переименовать
				</li>
				<li>
					<img src={iconRemove} alt='Удалить набор' />
					Сбросить&nbsp;прогресс
				</li>
				<li onClick={deleteSetHandle}>
					<img src={iconRemove} alt='Удалить набор' />
					Удалить набор
				</li>
			</ul>
		</div>
	)
}
