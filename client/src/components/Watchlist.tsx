import React from "react";
import Stock from "./Stock";
import styles from "../../../styles.css";

type Props = {
  watchlist: {
    name: string;
    ticker: string;
    shares: number;
    data: { date: string; cost: number }[];
  }[];
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
};

const Watchlist: React.FC<Props> = ({
  watchlist,
  setChart,
  addToPortfolio,
  removeFromPortfolio,
}) => {
  const list = watchlist.map((item) => (
    <Stock
      key={item.ticker}
      stock={item}
      setChart={setChart}
      addToPortfolio={addToPortfolio}
      removeFromPortfolio={removeFromPortfolio}
      type={"watchlist"}
    />
  ));

  return (
    <div className={`${styles.watchlist} ${styles.list}`}>
      <div className={styles.myStocksTitle}>Watchlist</div>
      <div className={styles.listContents}>{list}</div>
    </div>
  );
};

export default Watchlist;
