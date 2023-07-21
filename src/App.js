
import Advice from './Advice';
import './App.css';
import React, { useState } from 'react';


export const ThemeContext = React.createContext();


function App() {

 
  const [darkTheme,setDarkTheme] = useState(true);
  const [value,setValue] = useState(true)

  function toggleTheme(){
      setDarkTheme(prevdarkTheme => !prevdarkTheme)
      setValue(prevvalue=>!prevvalue)
  }
  
  
  return (
   
        <ThemeContext.Provider value={darkTheme}>
           <div className={darkTheme? "dark_Screen": "Screen"}>

<div className={darkTheme? 'dark_button':'button'}>
        <button onClick={toggleTheme}>{value? "Dark":"Light "} Theme</button>
    </div>
        <Advice />
        </div>
        </ThemeContext.Provider>
     

        
     
   
  );
}

export default App;
