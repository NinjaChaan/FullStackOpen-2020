import React from 'react'
const Persons = ({ getFilteredPersons, removePerson }) => {
    return (
        <>
            {getFilteredPersons().map((person) =>
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={()=>removePerson(person)}>delete</button>
                </div>
            )}
        </>
    )
}

export default Persons