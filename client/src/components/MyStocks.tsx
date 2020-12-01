import React from "react";
import Stock from "./Stock";
import Search from "./Search";
import styles from "../../../styles.css";

type Props = {
  search: string;
  portfolio: {
    name: string;
    ticker: string;
    shares: number;
    data: { date: string; cost: number }[];
  }[];
  myPlotData: {
    ticker: string;
    name: string;
    data: { date: string; cost: number }[];
  };
  setChart: (stock: {
    ticker: string;
    name: string;
    data: { date: string; cost: number }[];
  }) => void;
  addToPortfolio: (
    e: React.MouseEvent<HTMLButtonElement>,
    stock: {
      name: string;
      ticker: string;
      shares: number;
      data: { date: string; cost: number }[];
    },
    value: string
  ) => void;
  removeFromPortfolio: () => void;
  getStock: ([string]) => void;
  setSearch: (string) => void;
};

const MyStocks: React.FC<Props> = ({
  search,
  portfolio,
  myPlotData,
  setChart,
  addToPortfolio,
  removeFromPortfolio,
  getStock,
  setSearch,
}) => {
  const list = portfolio.map((item) => (
    <Stock
      key={item.ticker}
      stock={item}
      setChart={setChart}
      addToPortfolio={addToPortfolio}
      type={"portfolio"}
    />
  ));

  return (
    <div>
      <div className={styles.searchPosition}>
        <Search getStock={getStock} search={search} setSearch={setSearch} />
      </div>
      <div className={`${styles.portfolio} ${styles.list}`}>
        <div className={`${styles.listTitle} ${styles.stockListTitle}`}>
          <div>My Stocks</div>
          <button
            className={styles.vmpButton}
            onClick={() => setChart(myPlotData)}
          >
            View my Portfolio
          </button>
        </div>
        <div className={styles.listContents}>{list}</div>
      </div>
    </div>
  );
};

export default MyStocks;
