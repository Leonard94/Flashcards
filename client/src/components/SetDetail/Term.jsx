export function Term({ front, back }) {
    return (
        <li style={{ marginBottom: '10px' }}>
            <span>{front}</span> | <span>{back}</span>
            <button>редактировать</button>
        </li>
    )
}
