import { useEffect, useState } from "react";
import "./Weather.css";
import "../../App.css";
import searchIcon from "../../assets/search.svg";
import { Droplet, Wind } from "lucide-react";
import { CurrentWeather } from "../../types/WeatherTypes";
import WeatherSkeleton from "./WeatherSkeleton";

type WeatherStatus = "idle" | "loading" | "success" | "error";

const Weather = () => {
  const [status, setStatus] = useState<WeatherStatus>("idle");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);

  const search = async (cityName: string) => {
    setStatus("loading");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) {
        setWeather(null);
        setStatus("error");
        return;
      }
      const data: CurrentWeather = await res.json();
      setWeather(data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };
  const fetchCityFromCoords = async (lat: number, lon: number) => {
    setStatus("loading");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_APP_ID}`,
      );

      //Pragmatically thinking I only need one line
      const data: Array<{ name: string }> = await res.json();

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
    if (!navigator.geolocation) {
      search("Valletta");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCityFromCoords(latitude, longitude);
      },
      (_error) => {
        console.log("User denied location");
        search("Valletta");
      },
    );
  }, []);

  return (
    <div className="weather-wrapper">
      <div id="mainContainer">
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

        {status === "loading" && <WeatherSkeleton />}

        {status === "success" && weather && (
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

        {status === "error" && (
          <div className="resultContainer">
            <h3>Location you entered is invalid!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
