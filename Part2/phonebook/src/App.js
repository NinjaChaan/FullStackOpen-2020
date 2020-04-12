import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

    useEffect(() => {
        personService.getAll().then(response => {
            setPersons(response)
        })
    }, [])

    const handlePersonForm = (event) => {
        event.preventDefault()

        const person = persons.find(p => p.name === newName)

        if (person) {
            updatePerson(person)
        } else {
            addPerson()
        }

        setNewName('')
        setNewNumber('')
    }

    const addPerson = () => {
        const personObject = {
            name: newName,
            number: newNumber
        }

        personService.create(personObject).then(data => {
            setPersons(persons.concat(data))
            createNotification(`Added ${newName}`, 'success')
        })
    }

    const updatePerson = (person) => {
        const personObject = {
            name: newName,
            number: newNumber
        }

        const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirmed) {
            personService
                .update(person.id, personObject)
                .then(data => {
                    setPersons(persons.map(p => (p.id === person.id)
                        ? data
                        : p
                    ))
                    createNotification(`${person.name} updated`, 'success')
                })
                .catch(error => {
                    createNotification(`Information of ${person.name} has already been removed from the server`, 'error')
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    const removePerson = (person) => {
        const confirmed = window.confirm(`Delete ${person.name} ?`)

        if (confirmed) {
            personService.remove(person.id).then(() => {
                setPersons(persons.filter(p => p.id !== person.id))
                createNotification(`${person.name} deleted`, 'success')
            })
            .catch(error => {
                createNotification(`Information of ${person.name} has already been removed from the server`, 'error')
                setPersons(persons.filter(p => p.id !== person.id))
            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const getFilteredPersons = () => {
        return (
            persons.filter(word => word.name.toLowerCase().includes(filter.toLowerCase()) ||
                word.number.toLowerCase().includes(filter.toLowerCase()))
        )
    }

    const createNotification = (message, type) => {
        setNotificationMessage(message)
        setNotificationType(type)
        setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} type={notificationType} />
            <Filter
                filter={filter}
                handleFilter={handleFilter}
            />
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handlePersonForm={handlePersonForm}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons
                getFilteredPersons={getFilteredPersons}
                removePerson={removePerson}
            />
        </div>
    )
}

export default App