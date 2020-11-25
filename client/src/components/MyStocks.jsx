import React from 'react';
import Stock from './Stock.jsx';

const MyStocks = (props) => {
  const { portfolio } = props;

  const list = portfolio.map(item => <Stock stock={item} />)

  return (
    <div className="portfolio list">
      <div className="listTitle">
        My Stocks
      </div>
      <div className="listContents">
        {list}
      </div>
    </div>
  )
}

export default MyStocks;