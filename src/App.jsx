import { useState } from "react";
import searchIcon from "./assets/search.svg";
// INCREASE THE VAR OF WEATHER AND ADD WIND ETC...
import "./App.css";
import "./Weather.css";
import Weather from "./Weather";
import Navbar from "./Navbar";
import Forecast from "./Forecast";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <div className={`main-wrapper ${isNightMode ? "night" : ""} `}>
      <Navbar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />
      <div className="page-content">
        <Routes>
          <Route
            path="/"
            element={
              <Weather
                className="weather-comp"
                isNightMode={isNightMode}
                setIsNightMode={setIsNightMode}
              />
            }
          />
          <Route
            path="/forecast"
            element={
              <Forecast
                isNightMode={isNightMode}
                setIsNightMode={setIsNightMode}
              />
            }
          />
          <Route path="*" element={<h1>404 Not Found </h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
