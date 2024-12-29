import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar';
import TetxForm from './Components/TetxForm';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = ()=>{
    if(mode ==='light'){
      setMode('dark');
      document.body.style.backgroundColor='#2e3235'
      }
      else{
        setMode('light');
        document.body.style.backgroundColor='white'
      }
  }

  return (
    <>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      <div className="container my-3">
        <TetxForm heading="Enter Your Text" mode={mode}/>
      </div>
       
    </>
  )
}

export default App
