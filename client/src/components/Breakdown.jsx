import React from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';
import styles from '../../../styles.css';

// const colors = ['#84cf96', '#84c9cf', '#8d84cf', '#cfc584'];
const colors = ['#b1e77f', '#cddb72', '#87bd66', '#e3c65d', '#6cc495', '#69c7bf', '#b35346' ];

const Breakdown = (props) => {
  const { portfolio, myPlotData } = props;
  let labels;
  const data = portfolio.map(stock => {
    return {name: stock.name, value: (stock.shares * stock.data[99].cost)}
  });
  if (myPlotData.data) {
    console.log(myPlotData.data[99])
    let i = -1;
    labels = portfolio.map(stock => {
      const percent = (100 * ((stock.data[99].cost * stock.shares) / myPlotData.data[99].cost)).toString();
      const perString = percent.substring(0, percent.indexOf('.') + 3);
      i += 1;
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ background: colors[i], height: '10px', width: '10px', marginRight: '10px' }}>{' '}</div>
            <div>{stock.name}</div>
          </div>
          <div>${stock.data[99].cost * stock.shares} / {perString}%</div>
        </div>
      )
    })
  }

  return (
    <div className={styles.breakdown}>
      <div className={styles.pieChart}>
        <PieChart width={170} height={170}>
          <Pie
            data={data}
            cx={85}
            cy={80}
            innerRadius={70}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
            }
          </Pie>
        </PieChart>
      </div>
      <div>
        <div className={styles.diversity}>Portfolio diversity</div>
        <div className={styles.divLabels}>
          <div>name</div>
          <div>equity</div>
        </div>
        <div>{labels}</div>
      </div>
    </div>
  )
}

export default Breakdown;