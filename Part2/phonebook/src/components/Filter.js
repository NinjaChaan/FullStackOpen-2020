import React from 'react'

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            filter people with <input value={filter}
                onChange={handleFilter} />
        </div>
    )
}
export default Filter