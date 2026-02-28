import React, { useEffect, useState } from "react";
import "./Weather.css";
import searchIcon from "./assets/search.svg";

const FiveDayWeather = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [dailyAvg, setDailyAvg] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [iconHolder, setIconHolder] = useState(null);

  /* -------------------- SEARCH -------------------- */

  const search = async (cityName) => {
    if (!cityName) return;

    try {
      setLoading(true);

      /* -------- FORECAST API CALL -------- */

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();

      if (!forecastData.list) {
        console.error("Invalid forecast response", forecastData);
        return;
      }

      setForecast(forecastData);

      /* -------- CURRENT WEATHER API CALL -------- */

      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

      const currentRes = await fetch(currentUrl);
      const currentData = await currentRes.json();

      if (!currentData.main) {
        console.error("Invalid current weather response", currentData);
        return;
      }

      setCurrentWeather(currentData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- INITIAL LOAD -------------------- */

  useEffect(() => {
    search("Valletta");
  }, []);

  /* -------------------- CALCULATE DAILY AVERAGE -------------------- */

  useEffect(() => {
    if (!forecast) return;

    const grouped = {};

    // Group by date
    for (let item of forecast.list) {
      const date = item.dt_txt.slice(0, 10);

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(item);
    }

    // Calculate averages
    const averages = {};
    for (let date of Object.keys(grouped)) {
      const sum = grouped[date].reduce(
        (total, item) => total + item.main.temp,
        0,
      );

      averages[date] = Math.round(sum / grouped[date].length);
    }

    /* -------------------- CALCULATE Most Repeated Icon  -------------------- */

    //const repItem = [];
    const groupbyDateIcon = {};

    //console.log(Object.entries(grouped));

    for (let item of Object.entries(grouped)) {
      if (!groupbyDateIcon[item[0]]) {
        groupbyDateIcon[item[0]] = [];
      }
      for (let i of item[1]) {
        groupbyDateIcon[item[0]].push(i.weather[0].icon);
      }
    }
    //console.log(groupbyDateIcon);

    const newObj = {};
    const tObj = {};
    const newArr = [];

    //console.log(Object.entries(groupbyDateIcon));

    for (let x of Object.entries(groupbyDateIcon)) {
      //console.log(x[1]);
      const newArr = [];
      for (let icon_code of x[1]) {
        let rep = 1;
        let icon_num = Number(icon_code.slice(1, 2));
        newArr.push(icon_num);
      }

      if (!newObj[x[0]]) {
        newObj[x[0]] = {};
      }

      newArr.forEach((number) => {
        if (!newObj[x[0]][number]) {
          newObj[x[0]][number] = 1;
        } else {
          newObj[x[0]][number] += 1;
        }
      });
    }

    for (let date of Object.keys(newObj)) {
      const lastArr = {};
      let max = 0;

      for (let ntry of Object.entries(newObj[date])) {
        //console.log(ntry[1]);
        if (ntry[1] >= max) {
          max = ntry[0];
        }
      }
      newObj[date] = max;

      //console.log(newObj);
    }
    setDailyAvg(averages);
    setIconHolder(newObj);
  }, [forecast]);

  /* -------------------- LOADING -------------------- */

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!forecast || !currentWeather) {
    return <p>Loading...</p>;
  }

  console.log(dailyAvg);

  /* -------------------- RENDRING -------------------- */

  console.log(iconHolder);

  return (
    <div id="mainContainer">
      {/* Search */}
      <div className="searchContainer">
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
      </div>

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
      <div className="extraResults">
        {dailyAvg &&
          Object.entries(dailyAvg).map(([date, avg]) => (
            <div className="dailyResult" key={date}>
              <img
                src={`https://openweathermap.org/img/wn/0${Number(iconHolder[date])}d@2x.png`}
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

export default FiveDayWeather;
