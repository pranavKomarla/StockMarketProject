import React from 'react'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import StockContext from '../context/StockContext'

const SearchResults = ({results}) => {

  const {darkMode} = useContext(ThemeContext)
  const {setStockSymbol} = useContext(StockContext)

  return (
    <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll  ${darkMode ? "bg-gray-800 border-gray-700 custom-scrollbar custom-scrollbar-dark" : "bg-white border-neutral-200 custom-scrollbar"}`}>
        {results.map((item) => {
            return (<li onClick = {() => {setStockSymbol(item.symbol);}} key={item.symbol} className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md transition duration-500 ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"}`}>
                <span>{item.symbol}</span>
                <span>{item.description}</span>
                
            </li>)
        })}
    </ul>
  )
}

export default SearchResults
