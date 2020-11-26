import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Search from './Search.jsx';
import News from './News.jsx';
import Chart from './Chart.jsx';
import Breakdown from './Breakdown.jsx';
import MyStocks from './MyStocks.jsx';
import Watchlist from './Watchlist.jsx';
import MyChart from '../myChart.js';
const axios = require('axios');

const App = () => {
  const [myPlotData, setMyPlotData] = useState([]);  // holds plot data to my specific portfolio
  const [plotData, setPlotData] = useState([]);  // this is the data passed into the setChart function
  const [portfolio, setPortfolio] = useState([]);  // holds objects of each stock I own
  const [watchlist, setWatchlist] = useState([]);  // holds objects of each stock in my watchlist
  const [chartView, setChartView] = useState({ ticker: 'My Portfolio', name: '' }); // ticker & name display on chart
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8020/requests',
    })
    .then(response => {
      var allStocks = response.data;
      var myStocks = [];
      var myWatchlist = [];
      for (let i = 0; i < allStocks.length; i++) {
        var format = allStocks[i].data.map(point => {
          return {date: point[0].date, cost: point[0].cost}
        });
        var object = {
          ticker: allStocks[i].ticker,
          name: allStocks[i].name,
          shares: allStocks[i].shares,
          data: format
        }
        if (object.shares === 0) {
          myWatchlist.push(object);
        } else {
          myStocks.push(object);
        }
      }
      setPortfolio(myStocks);
      setWatchlist(myWatchlist);
      return myStocks
    })
    .then((port) => {
      getMyPortfolio(port);
    })
  }

  const getMyPortfolio = (port) => {
    // Updates the values in my portfolio (called only by getAll)
    var chart = new MyChart();
    chart.setData(port);
    setMyPlotData(chart);
    setChart(chart);
  }

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
      var currentPort = portfolio;
      currentPort.push(object);
      // Call addToPortfolio to send the stock to your database
      addToWatchlist(object);
    })
  }

  const addToWatchlist = (stock) => {
    // Adds the stock data from the API request to my database
    axios({
      method: 'post',
      url: 'http://localhost:8020/requests',
      data: stock
    })
    .then(() => {
      // Call get all to get all new stock data and update your portfolio hook
      getAll();
    })
  }

  const addToPortfolio = (e, stock, value) => {
    e.preventDefault();

    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].ticker === stock.ticker) {
        let total = Number.parseInt(portfolio[i].shares) + Number.parseInt(value);
        if (total < 0) {
          total = 0;
        }
        updateShares(stock.ticker, total)
      }
    }
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].ticker === stock.ticker) {
        const total = Number.parseInt(value);
        updateShares(stock.ticker, total);
      }
    }
  }

  const updateShares = (ticker, total) => {
    axios({
      method: 'patch',
      url: 'http://localhost:8020/requests',
      data: {
        ticker: ticker,
        amount: total
      }
    })
    .then(() => {
      getAll()
    })
  }

  const removeFromPortfolio = () => {
    // removes a stock from the portfolio
  }

  const setChart = (stock) => {
    const dataPoints = stock.data.map(point => {return {"name": point['date'].substring(5), "uv": point['cost'], "price": point['cost']}});
    setPlotData(dataPoints);
    setChartView({ ticker: stock.ticker, name: stock.name })
    // Sets the data sent into the chart
  }

  return (
    <div>
      <div className="header">
        <Header setChart={setChart} myPlotData={myPlotData} />
      </div>
      <div className="columns container">
        <div className="col1">
          <Search getStock={getStock} search={search} setSearch={setSearch} />
          <News />
        </div>
        <div className="col2">
          <Chart plotData={plotData} chartView={chartView} />
          <Breakdown portfolio={portfolio} myPlotData={myPlotData} />
        </div>
        <div className="col3">
          <MyStocks portfolio={portfolio} setChart={setChart} addToPortfolio={addToPortfolio} removeFromPortfolio={removeFromPortfolio} myPlotData={myPlotData} />
          <Watchlist watchlist={watchlist} setChart={setChart} addToPortfolio={addToPortfolio} removeFromPortfolio={removeFromPortfolio} />
        </div>
      </div>
    </div>
  )
}

export default App;
