import "./Navbar.css";
import { Link } from "react-router-dom";

import { useState } from "react";

const Navbar = ({ isNightMode, setIsNightMode }) => {
  return (
    <nav className={`header-wrap ${isNightMode ? "night" : ""}`}>
      <ul className="logo-wrapper">
        <li className="logo-item">
          <Link to="/">weatherApp</Link>
        </li>
      </ul>
      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/">Current Weather</Link>
        </li>
        <li className="navbar-item">
          <Link to="forecast">5 Day Forecast</Link>
        </li>
        <li className="night-mode-toggle-wrapper">
          <p>Night Mode</p>
          <button
            className={`night-mode-toggle-btn ${isNightMode ? "toggled " : ""}`}
            onClick={() => setIsNightMode(!isNightMode)}
          >
            <div className="thumb"></div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
