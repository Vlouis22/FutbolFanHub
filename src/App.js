import logo from './logo.svg';
import './App.css';
import { Nav } from './Nav';
import { Home } from './Home';
import { useState } from 'react';

function App() {

  const [input, setInput] = useState('')

  function handleChange(e){
    e.preventDefault();
    setInput(e.target.value)
  }

  return (
    <>
    <Nav handleChange={handleChange} input={input}/>
    <Home input={input}/>
    </>
  );
}

export default App;
