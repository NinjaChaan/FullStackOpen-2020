import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './Components/CountryList'
import Country from './Components/Country'
import Filter from './Components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
        })
    }, [])

    const handleFilter = (event) => {
        setFilter(event.target.value)
        setSelectedCountry(null)
    }

    const setCountry = (country) => {
        setSelectedCountry(country)
    }

    const getFilteredCountries = () => {
        return (
            countries.filter(word => word.name.toLowerCase().includes(filter.toLowerCase()))
        )
    }
    if (selectedCountry != null) {
        return (
            <div>
                <Filter filter={filter} handleFilter={handleFilter} />
                <Country country={selectedCountry} />
            </div>
        )
    } else {
        return (
            <div>
                <Filter filter={filter} handleFilter={handleFilter} />
                <CountryList filter={filter} getFilteredCountries={getFilteredCountries} setCountry={setCountry} />
            </div>
        );
    }
}

export default App;
