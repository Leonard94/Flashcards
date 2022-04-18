import { NavLink } from 'react-router-dom'

export function SetsCard({ title, _id: id }) {
    return <NavLink to={`/${id}`}>{title}</NavLink>
}
