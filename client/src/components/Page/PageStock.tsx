import React, { useState } from "react";
import styles from "../../../../styles.css";

type Props = {
  stockData: {
    name: string;
    ticker: string;
    shares: number;
    data: { name: string; uv: number; price: number }[];
  };
};

const PageStock: React.FC<Props> = ({ stockData }) => {
  let [start, end, percent] = 0;
  if (stockData.data.length > 0) {
    start = stockData.data[98].price;
    end = stockData.data[99].price;
    percent = 100 * ((end - start) / start);
  }

  return (
    <div className={styles.pageStock}>
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
      <div>Stats</div>
    </div>
  );
};

export default PageStock;
