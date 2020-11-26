import React from 'react';
import Stock from './Stock.jsx';

const MyStocks = (props) => {
  const { portfolio, setChart, addToPortfolio, removeFromPortfolio, myPlotData } = props;

  const list = portfolio.map(item => <Stock stock={item} setChart={setChart} addToPortfolio={addToPortfolio} type={'portfolio'} />)

  return (
    <div className="portfolio list">
      <div className="listTitle stockListTitle">
        <div>My Stocks</div>
        <button className="vmpButton" onClick={() => setChart(myPlotData)}>View my Portfolio</button>
      </div>
      <div className="listContents">
        {list}
      </div>
    </div>
  )
}

export default MyStocks;