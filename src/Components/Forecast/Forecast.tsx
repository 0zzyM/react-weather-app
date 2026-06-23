import { useEffect, useState } from "react";
import "../Weather/Weather.css";
import searchIcon from "../../assets/search.svg";

import {
  ForecastData,
  CurrentWeather,
  ForecastItem,
} from "../../types/WeatherTypes";

interface ForecastProps {
  isNightMode: boolean;
}

const Forecast = ({ isNightMode }: ForecastProps) => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [dailyAvg, setDailyAvg] = useState<Record<string, number> | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [iconHolder, setIconHolder] = useState<Record<string, string> | null>(
    null,
  );

  /* -------------------- SEARCH -------------------- */

  const search = async (cityName: string) => {
    if (!cityName?.trim()) return;

    try {
      setLoading(true);

      // Clear old data
      setForecast(null);
      setCurrentWeather(null);
      setDailyAvg(null);
      setIconHolder(null);

      const cleanCity = cityName.trim();

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cleanCity}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

      const [forecastRes, currentRes] = await Promise.all([
        fetch(forecastUrl),
        fetch(currentUrl),
      ]);

      if (!forecastRes.ok) throw new Error("Forecast API failed");
      if (!currentRes.ok) throw new Error("Current API failed");

      const forecastData: ForecastData = await forecastRes.json();
      const currentData: CurrentWeather = await currentRes.json();

      setForecast(forecastData);
      setCurrentWeather(currentData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* -------- OPENWEATHER REVERSE GEOCODING  API CALL -------- */

  const fetchCityFromCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_APP_ID}`,
      );

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

  /* -------------------- INITIAL LOAD -------------------- */

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

  /* -------------------- CALCULATE DAILY AVERAGE -------------------- */

  useEffect(() => {
    if (!forecast) return;

    const grouped: Record<string, ForecastItem[]> = {};

    // Group by date
    for (let item of forecast.list) {
      //item.dt returns --> seconds since Jan 1, 1970 (UTC)
      //city.timezone returns --> +1 -1 hr in seconds UTC+1 will return 3600 for example
      //(item.dt + forecast.city.timezone) was multiply by 1000 as js uses ms for Date
      const localTimestamp = (item.dt + forecast.city.timezone) * 1000;
      //Timestamp is converted to date here
      const localDate = new Date(localTimestamp);
      //toIsoString will convert the object to YYYY-MM-DD T HH:mm:ss.sssZ
      //spliting the string from T as that seperates time and date
      const date = localDate.toISOString().split("T")[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(item);
    }

    const sorted = Object.keys(grouped).sort();
    const firstFiveDays = sorted.slice(0, 5);
    //console.log(grouped);
    //console.log(sorted);

    const limitedGrouped = Object.fromEntries(
      Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(0, 5),
    );

    // Calculate averages
    const averages: Record<string, number> = {};
    for (let date of firstFiveDays) {
      const sum = limitedGrouped[date].reduce(
        (total, item) => total + item.main.temp,
        0,
      );

      averages[date] = Math.round(sum / limitedGrouped[date].length);
    }

    /* -------------------- CALCULATE Most Repeated Icon  -------------------- */

    const groupedEntries = Object.entries(limitedGrouped);
    const dailyMostUsedIcon: Record<string, string> = {};

    for (const [date, forecastItems] of groupedEntries) {
      const iconFrequency: Record<string, number> = {};

      // Count occurrences of each icon
      for (const item of forecastItems) {
        const iconCode = item.weather[0].icon.slice(0, 2);
        iconFrequency[iconCode] = (iconFrequency[iconCode] || 0) + 1;
      }

      // Find most frequent icon
      let highestCount = 0;
      let mostFrequentIcon = "";

      for (const [iconCode, count] of Object.entries(iconFrequency)) {
        if (count > highestCount) {
          highestCount = count;
          mostFrequentIcon = iconCode;
        }
      }

      dailyMostUsedIcon[date] = mostFrequentIcon;
    }

    console.log(dailyMostUsedIcon);
    setDailyAvg(averages);
    setIconHolder(dailyMostUsedIcon);
  }, [forecast]);

  /* -------------------- LOADING -------------------- */

  if (loading) return <p>Loading...</p>;

  if (!forecast || !currentWeather) return <p>Loading...</p>;

  /* -------------------- RENDRING -------------------- */

  return (
    <div className={`mainContainer ${isNightMode ? "night" : ""}`}>
      {/* Search */}
      <form
        className="searchContainer"
        onSubmit={(e) => {
          e.preventDefault();
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
          className={`searchIcon ${isNightMode ? "night" : ""}`}
          onClick={() => search(city)}
        />
      </form>

      {/* Current Weather */}
      {currentWeather?.weather?.[0] && (
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          alt="weatherIcon"
          className="weatherIcon"
        />
      )}

      <h2 className="location">{forecast?.city?.name}</h2>

      <div className="results">
        <h2 className="tempratureC">
          {currentWeather?.main?.temp
            ? `${Math.round(currentWeather.main.temp)} °C`
            : ""}
        </h2>

        <p>
          Feels Like{" "}
          {currentWeather?.main?.feels_like
            ? `${Math.round(currentWeather.main.feels_like)} °C`
            : ""}
        </p>
      </div>

      {/* Daily Averages */}
      <div className="extraResults-daily">
        {dailyAvg &&
          iconHolder &&
          Object.entries(dailyAvg).map(([date, avg]) => (
            <div className="dailyResult" key={date}>
              <img
                //src logic solves the bugs until the code is cleaned for daily icon logic
                //src={`https://openweathermap.org/img/wn/${Number(iconHolder[date]) < 10 ? "0" : ""}${iconHolder[date]}d@2x.png`}
                src={`https://openweathermap.org/img/wn/${iconHolder[date]}d@2x.png`}
                alt="weatherIcon"
                className="weatherIcon"
              />
              <h4>
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </h4>
              <p>{avg} °C</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forecast;
