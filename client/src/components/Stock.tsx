import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles.css";

const Stock: React.FC = (props) => {
  const { stock, setChart, addToPortfolio, type } = props;

  const [vis, setVis] = useState(false);
  const [buyVal, setBuyVal] = useState('');
  const [sellVal, setSellVal] = useState('');
  const percent = (100 * ((stock.data[99].cost - stock.data[98].cost) / stock.data[98].cost)).toPrecision(2);

  const handleChange = (e, type) => {
    if (type === 'b') {
      setBuyVal(e.target.value);
    } else {
      setSellVal(e.target.value);
    }
  }

  const height = type === 'watchlist' ? '100px' : '130px';
  const url = `/stock/${stock.ticker}`

  return (
    <div className={styles.stockContainer} style={{ height: vis ? height : '55px', transition: 'all .3s ease' }}>
      <div className={styles.stock}>
        <Link to={`/stock/${stock.ticker}`} style={{ textDecoration: 'none' }}>
          <div className={styles.openStock}>
            <div style={{ width: '120px', marginLeft: '10px' }}>
              <div>{stock.ticker}</div>
              <div style={{ fontSize: '13px', textDecoration: 'none' }}>{stock.shares === 0 ? '' : `${stock.shares} shares`}</div>
            </div>
            <div style={{ width: '110px' }}>
              <div>${stock.data[99].cost}</div>
              <div style={{ display: 'flex' }}>
                <div>{percent > 0 ? <span className={styles.pos}>&#8599;</span> : <span className={styles.neg}>&#8600;</span>}</div>
                <div style={{ marginLeft: '5px' }}>{percent}%</div>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.tradeStock} onClick={() => {
            if (!vis) {
              setChart(stock)
            }
          }}>
          <button className={styles.tradeButton} onClick={() => setVis(!vis)}>{vis ? 'cancel' : 'trade'}</button>
        </div>
      </div>
      <div>
        <div className={styles.tradeContainer}>
          <form autoComplete="off" className={styles.tradeForm}>
            <div style={{ marginBottom: '5px' }}>
              <input className={styles.tradeInput} autoComplete="off" id="buy" type="text" value={buyVal} onChange={(e) => handleChange(e, 'b')}></input>
              <button className={styles.buyButton} onClick={(e) => addToPortfolio(e, stock, buyVal)}>buy</button>
            </div>
            <div style={{ display: type === 'watchlist' ? 'none' : 'block' }}>
              <input className={styles.tradeInput} autoComplete="off" id="sell" type="text" value={sellVal} onChange={(e) => handleChange(e, 's')}></input>
              <button className={`${styles.buyButton} ${styles.sellButton}`} onClick={(e) => addToPortfolio(e, stock, -1 * sellVal)}>sell</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Stock;