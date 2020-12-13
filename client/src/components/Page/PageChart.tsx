import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "../../../../styles.css";

type Props = {
  stockData: {
    name: string;
    ticker: string;
    shares: number;
    data: { name: string; uv: number; price: number }[];
  };
};

const PageChart: React.FC<Props> = ({ stockData }) => {
  const [time, setTime] = useState<number>(99);

  if (stockData.data.length > 0) {
    const timedPlotData = stockData.data.slice(99 - time);
    const start = stockData.data[99 - time].price;
    const yesterday = stockData.data[98].price;
    const end = stockData.data[99].price;
    const percent = 100 * ((end - start) / start);
    const daily = 100 * ((end - yesterday) / end);

    return (
      <div className={styles.graph}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            margin: "0px 0px 10px 0px",
          }}
        >
          <div
            style={{
              fontWeight: "bolder",
              fontSize: "26px",
              margin: "0px 10px 0px 10px",
            }}
          >
            {stockData.ticker}
          </div>
          <div style={{ textDecoration: "underline" }}>{stockData.name}</div>
          <div style={{ display: "flex", marginLeft: "12px" }}>
            <div>
              {daily > 0 ? (
                <span className={styles.pos}>&#8599;</span>
              ) : (
                <span className={styles.neg}>&#8600;</span>
              )}
            </div>
            <div style={{ marginLeft: "5px" }}>{daily.toPrecision(2)}%</div>
          </div>
        </div>
        <ResponsiveContainer height={350}>
          <AreaChart
            className={styles.chart}
            data={timedPlotData}
            margin={{
              top: 0,
              right: 0,
              left: -60,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={end > start ? "#81cc6e" : "rgb(248, 110, 100)"}
                  stopOpacity={0.1}
                />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis stroke="white" dataKey="name" />
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
            <Area
              type="monotone"
              dataKey="price"
              stroke={end > start ? "#81cc6e" : "rgb(248, 110, 100)"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div
          className={styles.timeline}
          style={{
            background:
              percent > 0
                ? "linear-gradient(to right, rgb(132, 206, 72), rgb(27, 180, 40))"
                : "linear-gradient(to right, rgb(248, 82, 82), rgb(199, 46, 135))",
            boxShadow:
              percent > 0
                ? "rgba(79, 145, 53) 0px 3px 12px"
                : "rgb(145, 53, 81) 0px 3px 12px",
          }}
        >
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
                {percent > 0 ? <span>&#8599;</span> : <span>&#8600;</span>}
              </div>
              <div style={{ marginLeft: "5px" }}>{percent.toPrecision(2)}%</div>
            </div>
          </div>
          <div>
            <button
              className={styles.timelineBut}
              style={{
                background: time === 7 ? "white" : "none",
                color: time === 7 ? "black" : "white",
                boxShadow:
                  time === 7 ? "rgba(0, 0, 0, 0.24) 1px 2px 4px" : "none",
              }}
              onClick={() => setTime(7)}
            >
              1 week
            </button>
            <button
              className={styles.timelineBut}
              style={{
                background: time === 30 ? "white" : "none",
                color: time === 30 ? "black" : "white",
                boxShadow:
                  time === 30 ? "rgba(0, 0, 0, 0.24) 1px 2px 4px" : "none",
              }}
              onClick={() => setTime(30)}
            >
              1 month
            </button>
            <button
              className={styles.timelineBut}
              style={{
                background: time === 99 ? "white" : "none",
                color: time === 99 ? "black" : "white",
                boxShadow:
                  time === 99 ? "rgba(0, 0, 0, 0.24) 1px 2px 4px" : "none",
              }}
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

export default PageChart;
