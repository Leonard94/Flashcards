import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addNewTermToTheSet, getTheSet } from '../../store/set/set-actions'
import iconBack from '../../assets/icon/icon__back.svg'
import iconCompleted from '../../assets/icon/icon__completed.svg'

export function AddNewTerm({ goBack, id }) {
	const dispatch = useDispatch()

	const [front, setFront] = useState('')
	const [back, setBack] = useState('')

	const addNew = () => {
		const data = { setId: id, back, front, completed: false }
		dispatch(addNewTermToTheSet(data)).then(() => {
			dispatch(getTheSet(id))
			goBack()
		})
	}

	return (
		<section className='detail__addterm'>
			<h3>Добавить новый термин</h3>

			<div className='term'>
				<div className='term__body term__body--editmode'>
					<form onSubmit={addNew} className='term__item term-item__inputs'>
						<textarea
							className='term-item__front term-item__input'
							placeholder='Лицевая сторона'
							value={front}
							spellCheck='false'
							autoFocus
							onChange={(e) => setFront(e.target.value)}
						/>
						<textarea
							className='term-item__back term-item__input'
							placeholder='Обратная сторона'
							value={back}
							spellCheck='false'
							onChange={(e) => setBack(e.target.value)}
						/>
					</form>
				</div>

				<div className='term__btn-row'>
					<button className='term-btn' onClick={goBack}>
						<img
							className='term-item__input-img'
							src={iconBack}
							alt='go back icon'
							title='Не добавлять новый термин'
						/>
					</button>
					<button className='term-btn' onClick={addNew}>
						<img
							className='term-item__input-img'
							type='submit'
							src={iconCompleted}
							alt='submit'
							title='Добавить новый термин'
						/>
					</button>
				</div>
			</div>
		</section>
	)
}
