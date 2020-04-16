import React from 'react'

const PersonForm = ({newName, newNumber, handlePersonForm, handleNameChange, handleNumberChange}) => {
    return (
        <>
        <h2>Add a new person</h2>
        <form onSubmit={handlePersonForm}>
            <div>
                name: <input value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm