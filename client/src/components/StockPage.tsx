import React, { useState, useEffect } from "react";

const StockPage: React.FC = () => {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    console.log(window);
  }, []);

  const getStock = (stock) => {
    // Grabs the stock data using the alphavantage API
    var coords = [];
    var apiKey = '721H17JOIS0DYUYS';
    var apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock[0]}&outputsize=compact&apikey=${apiKey}`;
    axios({
      method: 'get',
      url: apiCall,
    })
    .then((data) => {
      for (let key in data['data']['Time Series (Daily)']) {
        coords.unshift({date: key, cost: data['data']['Time Series (Daily)'][key]['4. close']})
      }
      var object = {
        ticker: stock[0],
        name: stock[1],
        shares: 0,
        data: coords
      }
      console.log(coords);

    })
  }

  // const setChart = (stock) => {
  //   const dataPoints = stock.data.map(point => {return {"name": point['date'].substring(5), "uv": point['cost'], "price": point['cost']}});
  //   setPlotData(dataPoints);
  //   setChartView({ ticker: stock.ticker, name: stock.name })
  //   // Sets the data sent into the chart
  // }

  return (
    <div>
      <p>Stonk</p>
    </div>
  )
}

export default StockPage;