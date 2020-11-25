import React from 'react';
import Stock from './Stock.jsx'

const Watchlist = (props) => {
  const { watchlist } = props;

  const list = watchlist.map(item => <Stock stock={item} />)

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