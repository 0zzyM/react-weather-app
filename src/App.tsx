import { useState } from "react";
import "./App.css";
import "./Components/Weather/Weather.css";
import Weather from "./Components/Weather/Weather";
import Navbar from "./Components/Navbar/Navbar";
import Forecast from "./Components/Forecast/Forecast";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <div className={`main-wrapper ${isNightMode ? "night" : ""} `}>
      <Navbar isNightMode={isNightMode} setIsNightMode={setIsNightMode} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route
            path="/forecast"
            element={<Forecast isNightMode={isNightMode} />}
          />
          <Route path="*" element={<h1>404 Not Found </h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
