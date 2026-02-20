import React, { useEffect,useState }  from "react";
import './Weather.css'
import searchIcon from './assets/search.svg';
import { Droplet } from 'lucide-react';


const Weather = () => {
    const search = async (city) => {
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
            const res = await fetch(url);
            const data = await res.json();
            setWeather(data);
        }
        catch (error){
            console.error(error)
        }
    }



    useEffect(() => {search("Valletta");}, []);

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("")



    return(          
        <div>
            <div id="mainContainer"> 
              <h1>Weather</h1>
              <div className="searchContainer">
                  <input type="text" placeholder="Enter a City" value={city} onChange={(e) => setCity(e.target.value)}/>
                  <img src={searchIcon} alt='' className="searchIcon" onClick={() => search(city)}/>
              </div> 
              {weather.name!==undefined && (
                <div className="resultContainer">
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" className="weatherIcon" />
                    <h2 className="tempratureC">
                    {Math.round(weather.main.temp)} °C
                    </h2>
                    <h2 className="location">
                    {weather.name}
                    </h2>
                    <p>Feels Like {weather.main.feels_like}</p>
                    <p>Min: {Math.round(weather.main.temp_min)} --- Max: {Math.round(weather.main.temp_max)} </p>

                    <div className="extraResults">
                    <Droplet />
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Atmospheric Pressure: {weather.main.pressure} (hPa)</p>
                    </div>


                </div>
              )}

              {weather.name==undefined &&( 
                <div className="resultContainer">
                    <h2>Location you entered is invalid!</h2>
                </div>
              )}
            </div>
        </div>
    )

}

export default Weather