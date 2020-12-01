import React from "react";
import styles from "../../../styles.css";

type Props = {
  setChart: (stock: { ticker: string; name: string; data: [] }) => void;
  myPlotData: { ticker: string; name: string; data: [] };
};

const Header: React.FC<Props> = ({ setChart, myPlotData }) => {
  return (
    <div className={styles.headerContents}>
      <div className={styles.logo} onClick={() => setChart(myPlotData)}>
        hindsight
      </div>
    </div>
  );
};

export default Header;
