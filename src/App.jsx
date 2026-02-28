import { useState } from 'react'
import searchIcon from './assets/search.svg';
// INCREASE THE VAR OF WEATHER AND ADD WIND ETC...
import './App.css'
import Weather from './Weather';
import Navbar from './Navbar'
import FiveDayWeather from './FiveDay';
import { Routes, Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className='main-wrapper'>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Weather className="weather-comp" />}/>
          <Route path="/fiveday" element={<FiveDayWeather/>}/>
          <Route path="*" element={<h1>404 Not Found </h1> }/>
      </Routes>
    </div>
  )
}

export default App
