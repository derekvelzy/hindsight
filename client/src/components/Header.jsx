import React from 'react';
import styles from '../../../styles.css';

const Header = (props) => {
  const { setChart, myPlotData } = props;

  return (
    <div className={styles.headerContents}>
      <div className={styles.logo} onClick={() => setChart(myPlotData)}>
        hindsight
      </div>
    </div>
  )
}

export default Header;