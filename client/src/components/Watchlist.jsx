import React from 'react';
import Stock from './Stock.jsx'
import styles from '../../../styles.css';

const Watchlist = (props) => {
  const { watchlist, setChart, addToPortfolio, removeFromPortfolio } = props;

  const list = watchlist.map(item => <Stock stock={item} setChart={setChart} addToPortfolio={addToPortfolio} type={'watchlist'} />)

  return (
    <div className={`${styles.watchlist} ${styles.list}`}>
      <div className={styles.listTitle}>
        Watchlist
      </div>
      <div className={styles.listContents}>
        {list}
      </div>
    </div>
  )
}

export default Watchlist;