import PropTypes from "prop-types";
const Pagination = ({ onPageChange, currentPage, pageSize, numBlogs }) => {
    const totalPages = Math.ceil(numBlogs / pageSize)
    const renderPaginationLinks = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <li className={`text-center rounded  ${pageNumber === currentPage ? "bg-orange-500 " : ""}`} key={pageNumber}>
                <button className='block border rounded border-[#ccc] size-8 p-1 hover:bg-orange-500 hover:rounded' onClick={() => { onPageChange(pageNumber) }} >{pageNumber}</button>
            </li>
        ))
    }
    return (
        <ul className='flex justify-center items-center gap-4'>
            <li>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            </li>
            <div className='flex gap-1'>{renderPaginationLinks()}</div>
            <li>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
        </ul>
    )
}

Pagination.propTypes = {
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    numBlogs: PropTypes.number
}

export default Pagination