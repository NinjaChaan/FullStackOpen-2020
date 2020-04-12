import React from 'react';
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>

            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h2>Spoken languages</h2>
            <ul>
                {
                    country.languages.map((language, i) =>
                        <li key={i}>
                            {language.name}

                        </li>
                    )
                }
            </ul>
            <img src={country.flag} height={'15%'} width={'15%'} alt={'flag'}></img>
            <Weather country={country}/>
        </div>
    )
}

export default Country