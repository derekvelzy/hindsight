import React from 'react';
import Stock from './Stock.jsx'

const Watchlist = (props) => {
  const { watchlist, setChart, addToPortfolio, removeFromPortfolio } = props;

  const list = watchlist.map(item => <Stock stock={item} setChart={setChart} addToPortfolio={addToPortfolio} type={'watchlist'} />)

  return (
    <div className="watchlist list">
      <div className="listTitle">
        Watchlist
      </div>
      <div className="listContents">
        {list}
      </div>
    </div>
  )
}

export default Watchlist;