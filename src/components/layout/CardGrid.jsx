
const CardGrid = ({ children }) => {
    return (
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(244px,1fr))] gap-8'>
            {children}
        </ul>
    )
}

export default CardGrid;