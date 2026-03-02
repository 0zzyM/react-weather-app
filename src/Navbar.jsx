import "./Navbar.css";
import { Link } from "react-router-dom";

import { useState } from "react";

const Navbar = () => {
  const [toggled, setToggled] = useState(false);
  console.log(toggled);

  return (
    <nav className="header-wrap">
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
          <Link to="fiveday">5 Day Forecast</Link>
        </li>
        <li className="night-mode-toggle-wrapper">
          <p>Night Mode</p>
          <button
            className={`toggle-btn ${toggled ? "toggled" : ""}`}
            onClick={() => setToggled(!toggled)}
          >
            <div className="thumb"></div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
