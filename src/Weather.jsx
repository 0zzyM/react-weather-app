import React, { useEffect, useState } from "react";
import "./Weather.css";
import "./App.css";
import searchIcon from "./assets/search.svg";
import { Droplet, Wind } from "lucide-react";

const Weather = () => {
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_APP_ID}`,
      );
      const data = await res.json();

      if (data.length > 0) {
        const cityName = data[0].name;
        search(cityName);
      } else {
        search("Valletta");
      }
    } catch (err) {
      console.error(err);
      search("Valletta");
    }
  };

  //tries to get user location if can't manage sets valletta as default
  useEffect(() => {
    console.log();
    if (!navigator.geolocation) {
      search("Valletta");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetchCityFromCoords(latitude, longitude);
      },
      (error) => {
        console.log("User denied location");
        search("Valletta"); // fallback
      },
    );
  }, []);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  return (
    <div className="weather-wrapper">
      <div id="mainContainer">
        {/*<h1>Weather</h1>*/}
        <form
          className="searchContainer"
          onSubmit={(e) => {
            e.preventDefault(); // ← THIS is required
            search(city);
          }}
        >
          <input
            type="text"
            placeholder="Enter a City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <img
            src={searchIcon}
            alt=""
            className="searchIcon"
            onClick={() => search(city)}
          />
        </form>
        {weather.name !== undefined && (
          <div className="resultContainer">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
              className="weatherIcon"
            />
            <h2 className="location">{weather.name}</h2>

            <div className="results">
              <h2 className="tempratureC">
                {Math.round(weather.main.temp)} °C
              </h2>
              <p className="feels-like">
                Feels Like {Math.round(weather.main.feels_like)} °C
              </p>
            </div>
            {/* 
                    <p>Min: {Math.round(weather.main.temp_min)} --- Max: {Math.round(weather.main.temp_max)} </p>
                    */}
            <div className="extraResults">
              <div className="humidity-wrapper">
                <Droplet />
                <p>Humidity: {weather.main.humidity}%</p>
              </div>

              <div className="wind-wrapper">
                <Wind />
                <p>Wind Speed: {Math.round(weather.wind.speed * 3.6)}km/h</p>
              </div>
            </div>
          </div>
        )}

        {weather.name == undefined && (
          <div className="resultContainer">
            <h2>Location you entered is invalid!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
