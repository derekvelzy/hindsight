import React, { useState, useEffect } from "react";
import styles from "../../../../styles.css";
import axios from "axios";

type Props = {
  stockData: {
    name: string;
    ticker: string;
    shares: number;
    data: { name: string; uv: number; price: number }[];
  };
};

const PageStock: React.FC<Props> = ({ stockData }) => {
  let [start, end, percent, value] = 0;
  if (stockData.data.length > 0) {
    start = stockData.data[98].price;
    end = stockData.data[99].price;
    const percentString = (100 * ((end - start) / start)).toString();
    percent = percentString.substring(0, percentString.indexOf(".") + 3);
    const valueString = (end * stockData.shares).toString();
    value = valueString.substring(0, valueString.indexOf(".") + 3);
    console.log(end, stockData.shares, value);
  }

  return (
    <div className={styles.pageStock}>
      <div className={styles.titleAndShares}>
        <div
          className={styles.pageStockTitle}
          style={{
            background:
              percent > 0
                ? "linear-gradient(to bottom right, rgb(132, 206, 72), rgb(27, 180, 40))"
                : "linear-gradient(to bottom right, rgb(248, 82, 82), rgb(199, 46, 135))",
          }}
        >
          <div style={{ fontSize: "28px", fontWeight: "600" }}>
            {stockData.ticker}
          </div>
          <div style={{ fontSize: "14px" }}>{stockData.name}</div>
        </div>
        <div>
          <div className={styles.numOfShares}>{stockData.shares}</div>
        </div>
      </div>
      <div className={styles.stockStats}>
        <div style={{ fontSize: "22px", marginBottom: "8px" }}>${end}</div>
        <div style={{ display: "flex" }}>
          <div>
            {Number.parseInt(percent) > -1 ? (
              <span className={styles.pos}>&#8599;</span>
            ) : (
              <span className={styles.neg}>&#8600;</span>
            )}
          </div>
          <div style={{ fontSize: "16px", marginBottom: "24px" }}>
            {percent}%
          </div>
        </div>
        <div className={`${styles.titleAndShares} ${styles.marketValue}`}>
          <div>My Value:</div>
          <div>${value}</div>
        </div>
      </div>
    </div>
  );
};

export default PageStock;
