import React, { useState, useEffect } from 'react';

const Stock = (props) => {
  const [vis, setVis] = useState(false);
  const { stock } = props;
  const percent = (100 * ((stock.data[99].cost - stock.data[98].cost) / stock.data[98].cost)).toPrecision(2);

  useEffect(() => {

  }, [vis])

  return (
    <div className="stockContainer" style={{ height: vis ? '100px' : '55px', transition: 'all .3s ease' }}>
      <div className="stock">
        <div className="openStock">
          <div style={{ width: '120px', marginLeft: '20px' }}>
            <div>{stock.ticker}</div>
            <div>{stock.shares === '0' ? `${stock.shares} shares` : ''}</div>
          </div>
          <div style={{ width: '110px' }}>
            <div>${stock.data[99].cost}</div>
            <div style={{ display: 'flex' }}>
              <div>{percent > 0 ? <span className="pos">&#8599;</span> : <span className="neg">&#8600;</span>}</div>
              <div style={{ marginLeft: '5px' }}>{percent}%</div>
            </div>
          </div>
        </div>
        <div className="tradeStock">
          <button className="tradeButton" onClick={() => setVis(!vis)}>trade</button>
        </div>
      </div>
      <div>
        <div className="tradeContainer">
          Trade
        </div>
      </div>
    </div>
  )
}

export default Stock;