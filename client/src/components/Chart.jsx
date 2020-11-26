import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Chart = (props) => {
  const { plotData } = props;
  console.log('re-render!')

  if (plotData.length > 0) {
    const start = plotData[0].price;
    const end = plotData[99].price;

    return (
      <div className="graph">
        <ResponsiveContainer height={380}>
          <LineChart
            className="chart"
            data={plotData}
            margin={{
              top: 0, right: 0, left: -58, bottom: 30,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[dataMin => (dataMin * 0.95), dataMax => (dataMax * 1.05)]} tick={false}/>
            <Tooltip />
          <Line dataKey="price" stroke={end > start ? "#95bdae" : "#f09390"} dot={false} strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
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