import { useState } from 'react'
import searchIcon from './assets/search.svg';
// INCREASE THE VAR OF WEATHER AND ADD WIND ETC...
import './App.css'
import Weather from './Weather';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Weather/>
  )
}

export default App
