import React, { useEffect, useState } from 'react'
import './Weather.css'
import axios from 'axios'

const Weather = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    useEffect(() => {
        const fetchDefaultLocation = async () => {
            const defaultLocation = "Jaipur"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=eb0be68c973378c6598a9207d61a29a0`

            const response = await axios.get(url)
            setData(response.data)
        }
        fetchDefaultLocation()
    }, [])

    const search = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=eb0be68c973378c6598a9207d61a29a0`

        try {
            const response = await axios.get(url)
            if (response.data.cod !== 200) {
                setData({ notFound: true })
            } else {
                setData(response.data)
                setLocation('')
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setData({ notFound: true })
            } else {
                console.error("An unexpected error occurred", error)
            }
        }

        console.log(data)
    }

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

    const getWeatherIcon = (weatherType) => {
        switch (weatherType) {
            case "Clear":
                return <i className='bx bxs-sun' ></i>
            case "Clouds":
                return <i className='bx bxs-cloud'></i>
            case "Rain":
                return <i className='bx bxs-cloud-rain'></i>
            case "Thunderstorm": // Corrected typo
                return <i className='bx bxs-cloud-lightning'></i>
            case "Haze":
            case "Mist":
                return <i className='bx bxs-cloud'></i>
            default:
                return <i className='bx bxs-sun' ></i>
        }
    };

    return (
        <div className='weather'>
            <div className="search">
                <div className="search-top">
                    <i className='fa-solid fa-location-dot'></i>
                    <div className="location">{data.name}</div>
                </div>
                <div className="search-location">
                    <input type="text" placeholder='Enter Locaton'
                        value={location}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} />
                    <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
                </div>
            </div>
            {data.notFound ? (<div className='not-found'>Not Found 😒</div>) : (<div className="weather-data">
                {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}
                <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                <div className="temp"> {data.main ? `${Math.round(data.main.temp)}°` : null} </div>
            </div>)}


        </div>
    )
}

export default Weather
