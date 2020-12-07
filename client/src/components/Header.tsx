import React from "react";
import styles from "../../../styles.css";

type Props = {
  mode: boolean;
  setMode: (arg: boolean) => void;
  setChart: (stock: {
    ticker: string;
    name: string;
    data: { date: string; cost: number }[];
  }) => void;
  myPlotData: {
    ticker: string;
    name: string;
    data: { date: string; cost: number }[];
  };
};

const Header: React.FC<Props> = ({ setChart, myPlotData, mode, setMode }) => {
  return (
    <div className={styles.headerContents}>
      <div className={styles.logo} onClick={() => setChart(myPlotData)}>
        hindsight
      </div>
      <div>
        <button
          className={styles.vmpButton}
          onClick={() => setChart(myPlotData)}
        >
          View my Portfolio
        </button>
        <button className={styles.modeBut} onClick={() => setMode(!mode)}>
          Mode
        </button>
      </div>
    </div>
  );
};

export default Header;
