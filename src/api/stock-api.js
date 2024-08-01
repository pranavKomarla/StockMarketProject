





const basepath = "https://cors-anywhere.herokuapp.com/http://finnhub.io/api/v1"; //https://cors-anywhere.herokuapp.com/
const basepathPoly = "https://api.polygon.io/v2";

export const searchSymbols = async (query) => {
    const url = `${basepath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json(); 
}

export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basepath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json(); 
}

export const fetchQuote = async (stockSymbol) => {
    const url = `${basepath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`
    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json(); 
}

export const fetchHistoricalData = async (stockSymbol, resolution, from, to) => { 
    //console.log(stockSymbol)
    let multiplier = 1;
    let timespan = "day"

    switch(resolution) {
        case "year":
            console.log("YEAR")
            timespan = "day"
            multiplier = 5;
          break;
        case "month":
            console.log("MONTH")
            timespan = "day"
            multiplier = 1;
          break;
        case "week":
            console.log("WEEK")
            timespan = "minute"
            multiplier = 10

        break;
        case "day":
            console.log("DAY")
            timespan = "minute"
            multiplier = 5;
        break;
        default:
          // code block
      }

    const url = `${basepathPoly}/aggs/ticker/${stockSymbol}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&apiKey=l9cwj3CDJxQWjeP0WmpgH8P8MCEgFC_5`
    console.log(url)
    console.log(`from is ... ${from}`)
    console.log(`to is ... ${to}`)
    

    const response = await fetch(url);

    if(!response.ok){
        const message = `An error has occured: ${response.status}`
        throw new Error(message);
    }

    const data = await response.json();


    //console.log('The JSON is:', JSON.stringify(data.results, null, 2));

    return data.results; 
    
}

