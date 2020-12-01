import React from "react";
import Stock from "./Stock";
import Search from "./Search";
import styles from "../../../styles.css";

const MyStocks: React.FC = (props) => {
  const { portfolio, setChart, addToPortfolio, removeFromPortfolio, myPlotData, getStock, search, setSearch, } = props;

  const list = portfolio.map(item => <Stock stock={item} setChart={setChart} addToPortfolio={addToPortfolio} type={'portfolio'} />)

  return (
    <div>
      <div className={styles.searchPosition}>
        <Search getStock={getStock} search={search} setSearch={setSearch} />
      </div>
      <div className={`${styles.portfolio} ${styles.list}`}>
        <div className={`${styles.listTitle} ${styles.stockListTitle}`}>
          <div>My Stocks</div>
          <button className={styles.vmpButton} onClick={() => setChart(myPlotData)}>View my Portfolio</button>
        </div>
        <div className={styles.listContents}>
          {list}
        </div>
      </div>
    </div>
  )
}

export default MyStocks;