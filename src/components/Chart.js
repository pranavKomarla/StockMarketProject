import React, { useContext, useState, useEffect } from 'react'
import { mockHistoricalData } from '../constants/mock'
import { convertUnixTimestampToDate, convertDateToUnixTimestamp, createDate } from '../helpers/date-helper.js';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Card from './Card';
import { chartConfig } from '../constants/config.js';
import ChartFilter from './ChartFilter.js';
import ThemeContext from '../context/ThemeContext.js';
import { fetchHistoricalData } from '../api/stock-api.js';
import StockContext from '../context/StockContext.js';





const Chart = () => {
    const [data, setData] = useState(mockHistoricalData)
    const [filter, setFilter] = useState("1Y");
    const { darkMode } = useContext(ThemeContext)
    const { stockSymbol } = useContext(StockContext);

    useEffect(() => {
        const getDateRange = () => {
            const { days, weeks, months, years } = chartConfig[filter]; 
            const endDate = new Date();
            //console.log(`endDate is ${endDate.toLocaleDateString()}`)
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
            const endDateFormat = endDate.toISOString().split("T")[0];
            const startDateFormat = startDate.toISOString().split("T")[0];
            //console.log(`end date is ${endDate.toISOString().split("T")[0]}`)
            //console.log(`start date is ${startDate.toISOString().split("T")[0]}`)
            

            

            return { startDateFormat, endDateFormat }
        };

        const updateChartDate = async () => {
            try {
                const { startDateFormat, endDateFormat } = getDateRange();

                //console.log(`Start Time is ${startTimestampMilliseconds}`)
                const resolution = chartConfig[filter].resolution;
                const result = await fetchHistoricalData(stockSymbol, resolution, startDateFormat, endDateFormat);
                console.log(`result is: ${JSON.stringify(data, null, 2)}`)
                setData(formatData(result)); 
                
                
            
                } catch(error) {
                  setData([])
                  console.log(error);
                }
        };

       
        updateChartDate();



    }, [stockSymbol, filter])

    const formatData = (data) => {
        return data
        .map((item) => {
            const dateString = convertUnixTimestampToDate(item.t);
            return {
                ...item,
                t: dateString
            }

        })
        
    }

  return (
    <Card>
        <ul className = "flex absolute top-2 right-2 z-40">
            {Object.keys(chartConfig).map((item) => {
                return (<li key = {item}>
                    <ChartFilter text = {item} active = {filter === item} onClick = {() => {setFilter(item)}}/>
                </li>)
            })}
        </ul>
        <ResponsiveContainer>
            <AreaChart data= {data}>
            <defs>
                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor = {darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor = {darkMode ? "#312e81" : "rgb(199 210 254)"} stopOpacity={0}/>
                </linearGradient>
                
            </defs>
            
            <Area 
                type = "monotone" 
                dataKey = "c" 
                stroke = {darkMode ? "#c4b5fd" : "#312e81"}
                fillOpacity = {1} 
                strokeWidth = {0.5}
                fill = "url(#chartColor)" 
            />
            <Tooltip contentStyle={darkMode ? {backgroundColor: "#111827"} : null} itemStyle  = {darkMode ? {color: "#818cf8"} : null}/>
            <XAxis dataKey = "t" stroke = {darkMode ? "#9ca3af" : undefined}/>
            <YAxis domain = {["dataMin", "dataMax"]} stroke = {darkMode ? "#9ca3af" : undefined}/>
            </AreaChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart
