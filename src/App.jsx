import { useState } from 'react'
import searchIcon from './assets/search.svg';
// INCREASE THE VAR OF WEATHER AND ADD WIND ETC...
import './App.css'
import Weather from './Weather';
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main-wrapper'>
      <Navbar/>
      <Weather />
      {/*<Weather />*/}
    </div>
  )
}

export default App
