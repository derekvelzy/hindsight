import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from '../../../styles.css';

const Chart = (props) => {
  const { plotData, chartView } = props;
  const [time, setTime] = useState(99);

  if (plotData.length > 0) {
    const timedPlotData = plotData.slice(99 - time)
    const start = plotData[99 - time].price;
    const end = plotData[99].price;
    const percent = (100 * ((end - start) / start)).toPrecision(2);

    return (
      <div className={styles.graph}>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div style={{ fontSize: '26px', margin: '0px 16px 16px 10px' }}>{chartView.ticker}</div>
          <div>{chartView.name}</div>
        </div>
        <ResponsiveContainer height={380}>
          <LineChart
            className={styles.chart}
            data={timedPlotData}
            margin={{
              top: 0, right: 0, left: -58, bottom: 20,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[dataMin => (dataMin * 0.95), dataMax => (dataMax * 1.05)]} tick={false}/>
            <Tooltip />
          <Line dataKey="price" stroke={end > start ? "#84b346" : "rgb(248, 110, 100)"} dot={false} strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
        <div className={styles.timeline}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: '24px', margin: '0px 20px 0px 10px' }}>${end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div style={{ display: 'flex'}}>
              <div>{percent > 0 ? <span className={styles.pos}>&#8599;</span> : <span className={styles.neg}>&#8600;</span>}</div>
              <div style={{ marginLeft: '5px' }}>{percent}%</div>
            </div>
          </div>
          <div>
            <button className={styles.timelineBut} style={{background: time === 7 ? 'rgb(235, 235, 235)' : ''}} onClick={() => setTime(7)}>1 week</button>
            <button className={styles.timelineBut} style={{background: time === 30 ? 'rgb(235, 235, 235)' : ''}} onClick={() => setTime(30)}>1 month</button>
            <button className={styles.timelineBut} style={{background: time === 99 ? 'rgb(235, 235, 235)' : ''}} onClick={() => setTime(99)}>3 months</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        chart
      </div>
    )
  }
}

export default Chart;