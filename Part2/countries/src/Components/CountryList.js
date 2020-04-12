import React from 'react';
import Country from './Country'

const CountryList = ({ filter, getFilteredCountries, setCountry }) => {

    const filteredCountries = getFilteredCountries()
    
    if (filter.length > 0) {
        if (filteredCountries.length >= 10) {
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            )
        } else if (filteredCountries.length === 1) {
            const country = filteredCountries[0]
            return (
                <Country country={country}/>
            )
        }
    }
    return (
        <>
            {
                filteredCountries.map((country, i) =>
                    <div key={country.alpha2Code}>
                        {country.name} <button onClick={()=>setCountry(country)}>show</button>
                    </div>
                )
            }
        </>
    )
}
export default CountryList