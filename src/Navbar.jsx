import { useState } from "react"

const Navbar = () => {

    const [toggled, setToggled] = useState(false)
    console.log(toggled)

    return(
        <nav className="header-wrap">
            <ul className="logo-wrapper">
                <li className="logo-item"><a href="#">weatherApp</a></li>
            </ul>
            <ul className="navbar">
                <li className="navbar-item"><a href="#">Current Weather</a></li>
                <li className="navbar-item"><a href="#">5 Day Forecast</a></li>
                <li className="night-mode-toggle-wrapper">
                    <p>Night Mode</p>
                    <button className={`toggle-btn ${toggled ? "toggled" : ""}`} onClick={()=> setToggled(!toggled)}>
                        <div className="thumb"></div>
                    </button>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar