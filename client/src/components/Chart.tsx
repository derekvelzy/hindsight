import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "../../../styles.css";

type Props = {
  plotData: [];
  chartView: {
    ticker: string;
    name: string;
  };
};

const Chart: React.FC<Props> = ({ plotData, chartView }) => {
  const [time, setTime] = useState(99);

  if (plotData.length > 0) {
    const timedPlotData = plotData.slice(99 - time);
    const start = plotData[99 - time].price;
    const end = plotData[99].price;
    const percent = (100 * ((end - start) / start)).toPrecision(2);

    return (
      <div className={styles.graph}>
        <ResponsiveContainer height={380}>
          <LineChart
            className={styles.chart}
            data={timedPlotData}
            margin={{
              top: 0,
              right: 0,
              left: -58,
              bottom: 0,
            }}
          >
            <XAxis stroke="white" tick={false} />
            <YAxis
              type="number"
              domain={[
                (dataMin) => dataMin * 0.95,
                (dataMax) => dataMax * 1.05,
              ]}
              stroke="white"
              tick={false}
            />
            <Tooltip />
            <Line
              dataKey="price"
              stroke={end > start ? "#81cc6e" : "rgb(248, 110, 100)"}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className={styles.timeline}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              margin: "15px 0px",
            }}
          >
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "26px",
                margin: "0px 10px 0px 10px",
              }}
            >
              {chartView.ticker}
            </div>
            <div style={{ textDecoration: 'underline' }}>{chartView.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              margin: "15px 0px",
            }}
          >
            <div style={{ fontSize: "24px", margin: "0px 20px 0px 10px" }}>
              ${end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <div style={{ display: "flex" }}>
              <div>
                {percent > 0 ? (
                  <span className={styles.pos}>&#8599;</span>
                ) : (
                  <span className={styles.neg}>&#8600;</span>
                )}
              </div>
              <div style={{ marginLeft: "5px" }}>{percent}%</div>
            </div>
          </div>
          <div>
            <button
              className={styles.timelineBut}
              style={{ color: time === 7 ? "#5ab361" : "" }}
              onClick={() => setTime(7)}
            >
              1 week
            </button>
            <button
              className={styles.timelineBut}
              style={{ color: time === 30 ? "#5ab361" : "" }}
              onClick={() => setTime(30)}
            >
              1 month
            </button>
            <button
              className={styles.timelineBut}
              style={{ color: time === 99 ? "#5ab361" : "" }}
              onClick={() => setTime(99)}
            >
              3 months
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>chart</div>;
  }
};

export default Chart;
