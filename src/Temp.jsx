import React, { useEffect, useState } from "react";
import "./Weather.css";
import searchIcon from "./assets/search.svg";

const FiveDayWeather = ({ isNightMode, setIsNightMode }) => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [dailyAvg, setDailyAvg] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [iconHolder, setIconHolder] = useState(null);

  /* -------------------- SEARCH -------------------- */

  const search = async (cityName) => {
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

      const forecastData = await forecastRes.json();
      const currentData = await currentRes.json();

      setForecast(forecastData);
      setCurrentWeather(currentData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* -------- OPENWEATHER REVERSE GEOCODING  API CALL -------- */

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
      (error) => {
        console.log("User denied location");
        search("Valletta"); // fallback
      },
    );
  }, []);

  /* -------------------- CALCULATE DAILY AVERAGE -------------------- */

  useEffect(() => {
    if (!forecast) return;

    const grouped = {};

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
    const averages = {};
    for (let date of firstFiveDays) {
      const sum = limitedGrouped[date].reduce(
        (total, item) => total + item.main.temp,
        0,
      );

      averages[date] = Math.round(sum / limitedGrouped[date].length);
    }

    /* -------------------- CALCULATE Most Repeated Icon  -------------------- */

    const groupbyDateIcon = {};

    for (let item of Object.entries(limitedGrouped)) {
      if (!groupbyDateIcon[item[0]]) {
        groupbyDateIcon[item[0]] = [];
      }
      for (let i of item[1]) {
        groupbyDateIcon[item[0]].push(i.weather[0].icon);
      }
    }

    const lgentries = Object.entries(limitedGrouped);

    //console.log(lgentries[0][1]);
    //console.log(lgentries[0][1][0]);

    //console.log(lgentries[0][1][0].weather[0].icon);

    const lastArr = {};

    for (let i = 0; i < 5; i++) {
      let max = 0;

      let tempNum = 0;
      let tempObj = {};
      //console.log(lgentries[i][0]);
      for (let j = 0; j < lgentries[i][1].length; j++) {
        tempNum = Number(lgentries[i][1][j].weather[0].icon.slice(0, 2));
        if (!tempObj[tempNum]) {
          tempObj[tempNum] = 1;
        } else {
          tempObj[tempNum]++;
        }
      }

      //console.log(Object.entries(tempObj));

      let mostrep = "";

      for (let numb of Object.entries(tempObj)) {
        if (numb[1] > max) {
          mostrep = numb[0];
        }
      }
      if (!lastArr[lgentries[i][0]]) {
        lastArr[lgentries[i][0]] = [];
      }

      lastArr[lgentries[i][0]].push(mostrep);
    }

    console.log(lastArr);

    const newObj = {};
    const tObj = {};
    const newArr = [];

    for (let x of Object.entries(groupbyDateIcon)) {
      const newArr = [];
      for (let icon_code of x[1]) {
        let rep = 1;
        let icon_num = Number(icon_code.slice(0, 2));
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
        if (ntry[1] >= max) {
          max = ntry[0];
        }
      }
      newObj[date] = max;
    }
    setDailyAvg(averages);
    setIconHolder(newObj);
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
          Object.entries(dailyAvg).map(([date, avg]) => (
            <div className="dailyResult" key={date}>
              <img
                //src logic solves the bugs until the code is cleaned for daily icon logic
                src={`https://openweathermap.org/img/wn/${Number(iconHolder[date]) < 10 ? "0" : ""}${iconHolder[date]}d@2x.png`}
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


