import './App.css';
import StockDashboard from './components/StockDashboard';
import StockContext from './context/StockContext';
import ThemeContext from './context/ThemeContext';
import React, { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false); 
  const [stockSymbol, setStockSymbol] = useState("MSFT"); 
  return (
    <>
    <div className="hidden">Learn React</div>
    
    <ThemeContext.Provider value = {{darkMode, setDarkMode}}>
      <StockContext.Provider value = {{stockSymbol, setStockSymbol}}>
        <StockDashboard />
      </StockContext.Provider>
      
    </ThemeContext.Provider>
    
    </>
    
  );
}

export default App;
