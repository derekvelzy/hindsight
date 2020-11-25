import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Search from './Search.jsx';
import News from './News.jsx';
import Chart from './Chart.jsx';
import Returns from './Returns.jsx';
import Breakdown from './Breakdown.jsx';
import MyStocks from './MyStocks.jsx';
import Watchlist from './Watchlist.jsx';
const axios = require('axios');

const App = () => {
  const [myPlotData, setMyPlotData] = useState([]);  // holds plot data to my specific portfolio
  const [plotData, setPlotData] = useState([]);  // this is the data passed into the setChart function
  const [portfolio, setPortfolio] = useState([]);  // holds objects of each stock I own
  const [watchlist, setWatchlist] = useState([]);  // holds objects of each stock in my watchlist
  const [chartView, setChartView] = useState({ ticker: 'My Portfolio', name: '' }); // ticker & name display on chart

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
    })
  }

  // const getMyPortfolio = () => {
  //   // Updates the values in my portfolio
  // }

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
      addToPortfolio(object);
    })
  }

  const addToPortfolio = (stock) => {
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

  const removeFromPortfolio = () => {
    // removes a stock from the portfolio
  }

  const setChart = (stock) => {
    // Sets the data sent into the chart
  }

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="columns container">
        <div className="col1">
          <Search getStock={getStock} />
          <News />
        </div>
        <div className="col2">
          <Chart />
          <Returns />
          <Breakdown />
        </div>
        <div className="col3">
          <MyStocks portfolio={portfolio}/>
          <Watchlist watchlist={watchlist}/>
        </div>
      </div>
    </div>
  )
}

export default App;
