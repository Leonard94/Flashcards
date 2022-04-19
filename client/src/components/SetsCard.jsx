import { NavLink } from 'react-router-dom'

export function SetsCard({ title, _id: id, study }) {
    function declination(n) {
        const arr = ['термин', 'термина', 'терминов']
        n = Math.abs(n) % 100
        let n1 = n % 10
        if (n > 10 && n < 20) {
            return arr[2]
        }
        if (n1 > 1 && n1 < 5) {
            return arr[1]
        }
        if (n1 === 1) {
            return arr[0]
        }
        return arr[2]
    }

    return (
        <>
            <li className='sets-card__body'>
                <NavLink to={`/${id}`}>
                    <h3 className='sets-card__title'>{title}</h3>
                    <h6 className='sets-card__subtitle'>
                        {study.length} {declination(study.length)}
                    </h6>
                </NavLink>
            </li>
        </>
    )
}
