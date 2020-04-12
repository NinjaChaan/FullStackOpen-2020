import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState({type:""})
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

    useEffect(() => {
        axios.get(url).then(response => {
            setWeather(response.data)
            if(response.data.error){
                setError(response.data.error)
            }        
        })
    }, [url])
    if (weather != null && weather.current != null) {
        return (
            <>
                <h2>Weather in {country.capital}</h2>
                <b>temperature:</b> {weather.current.temperature} celsius
                <br/>
                <img src={weather.current.weather_icons[0]} alt={'weather icon'}></img>
                <br/>
                <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
            </>
        )
    }else{
        return(
        <p>Couldn't load weather data ({error.type})</p>
        )
    }
}

export default Weather