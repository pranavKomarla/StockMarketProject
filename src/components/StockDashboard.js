import React, {useContext, useEffect, useState} from 'react'
import Details from './Details'
import Chart from './Chart'


import { mockCompanyDetails } from '../constants/mock'

import Header from './Header'
import Overview from './Overview'
import ThemeContext from '../context/ThemeContext'
import StockContext from '../context/StockContext'
import { fetchQuote, fetchStockDetails } from '../api/stock-api'

const StockDashboard = () => {

    const { darkMode } = useContext(ThemeContext)
    const { stockSymbol } = useContext(StockContext);
    
    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({});

    useEffect(() => {
      const updateStockDetails = async () => {
        try {
          const result = await fetchStockDetails(stockSymbol);
          setStockDetails(result);

        } catch(error) {
          setStockDetails({})
          console.log(error);
        }
      };

      const updateStockOverview = async () => {
        try {
          const result = await fetchQuote(stockSymbol);
          setQuote(result);

        } catch(error) {
          setQuote({})
          console.log(error);
        }
      };

      updateStockDetails();
      updateStockOverview();


    }, [stockSymbol]) // so essentially this function will run whenever there is change made to stockSymbol. Therefore, wheneve we change stockSymbol in the search.js file, we activate this function.


  return (
    <div className = {`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}>
        
        <div className = "col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
            <Header name ={stockDetails.name}/>
        </div>

        <div className = "md:col-span-2 row-span-4">
            <Chart/>
        </div>

        <div>
            <Overview symbol = {stockSymbol} price= {quote.c} change = {quote.d} changePercent = {quote.dp} currency = {stockDetails.currency}/>
        </div>

        <div className = "row-span-2 xl:row-span-3">
            <Details details = {stockDetails}/>
        </div>

    </div>
  )
}

export default StockDashboard
