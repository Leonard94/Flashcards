import { NavLink } from 'react-router-dom'

export function SetsCard({ title, _id: id, study }) {
    function declination(n) {
        const arr = ['термин', 'терминов', 'терминов']
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
            <NavLink to={`/${id}`}>{title}</NavLink>
            <br />
            {study.length} {declination(study.length)}
        </>
    )
}
