import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles.css";

const colors: {} = [
  {
    static: "rgb(88, 96, 110)",
    hov: "linear-gradient(to bottom right, rgb(88, 96, 110), rgb(65, 71, 82))"
  },
  {
    static: "rgb(233, 112, 118)",
    hov: "linear-gradient(to bottom right, rgb(233, 112, 118), rgb(233, 113, 227))"
  },
  {
    static: "rgb(241, 231, 88)",
    hov: "linear-gradient(to bottom right, rgb(241, 231, 88), rgb(193, 226, 100))"
  },
  {
    static: "rgb(112, 233, 173)",
    hov: "linear-gradient(to bottom right, rgb(112, 233, 173), rgb(113, 161, 233))"
  },
  {
    static: "rgb(255, 110, 84)",
    hov: "linear-gradient(to bottom right, rgb(255, 110, 84), rgb(245, 61, 61))"
  },
  {
    static: "rgb(114, 112, 233)",
    hov: "linear-gradient(to bottom right, rgb(114, 112, 233), rgb(169, 113, 233))"
  },
  {
    static: "rgb(233, 181, 112)",
    hov: "linear-gradient(to bottom right, rgb(233, 181, 112), rgb(233, 131, 113))"
  },
  {
    static: "rgb(233, 225, 112)",
    hov: "linear-gradient(to bottom right, rgb(233, 225, 112), rgb(113, 233, 227))"
  },
  {
    static: "rgb(88, 241, 170)",
    hov: "linear-gradient(to bottom right, rgb(88, 241, 170), rgb(79, 224, 200))"
  }
];

type Props = {
  colorID: number;
  stock: {
    name: string;
    ticker: string;
    shares: number;
    data: { date: string; cost: number }[];
  };
  type: string;
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
  removeFromPortfolio: (ticker: string) => void;
};

const Stock: React.FC<Props> = ({
  colorID,
  stock,
  type,
  setChart,
  addToPortfolio,
  removeFromPortfolio,
}) => {
  const [vis, setVis] = useState<boolean>(false);
  const [buyVal, setBuyVal] = useState<string>("");
  const [sellVal, setSellVal] = useState<string>("");
  const [hover, setHover] = useState<boolean>(false);
  const percent: string = (
    100 *
    ((stock.data[99].cost - stock.data[98].cost) / stock.data[98].cost)
  ).toPrecision(2);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === "b") {
      setBuyVal(e.target.value);
    } else {
      setSellVal(e.target.value);
    }
  };

  const multStrings = (mult: string, cost: number) => {
    mult = mult || "0";
    const num = ((Number.parseInt(mult)) * cost).toString()
    return num.substring(0, num.indexOf('.') + 3);
  }

  const height = type === "watchlist" ? "100px" : "130px";
  const url = `/stock/${stock.ticker}`;

  return (
    <div className={styles.stockContainer}>
      <div className={styles.stock} onClick={() => {
            if (!vis) {
              setChart(stock);
            }
          }}>
        <div>
          <div
            className={styles.titleAndShares}
            style={{  }}
          >
            <Link
              to={`/stock/${stock.ticker}`}
              className={styles.stockTitle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ background: hover ? colors[colorID || 0].static : colors[colorID || 0].hov }}
            >
              <div style={{ fontSize: '28px', fontWeight: '600' }}>{stock.ticker}</div>
              <div style={{ fontSize: '14px' }}>{stock.name}</div>
            </Link>
            <div>
              {stock.shares === 0 ?
                (<button
                  style={{ display: type === "watchlist" ? "block" : "none" }}
                  className={`${styles.remove} ${styles.numOfShares}`}
                  onClick={() => removeFromPortfolio(stock.ticker)}
                >
                  x
                </button>)
               : <div className={styles.numOfShares}>{stock.shares}</div>}
            </div>
          </div>
          <div className={styles.stockStats}>
            <div style={{ fontSize: "22px", marginBottom: "8px" }}>${stock.data[99].cost}</div>
            <div style={{ display: "flex" }}>
              <div>
                {Number.parseInt(percent) > -1 ? (
                  <span className={styles.pos}>&#8599;</span>
                ) : (
                  <span className={styles.neg}>&#8600;</span>
                )}
              </div>
              <div style={{ fontSize: "16px" }}>{percent}%</div>
            </div>
          </div>
          <button className={styles.tradeButton} onClick={() => setVis(!vis)}>trade</button>
        </div>

      </div>
      <div className={styles.tradeContainer} style={{ marginBottom: vis ? '0px': '-150px', transition: 'all 0.3s ease', background: colors[colorID || 0].hov }}>
        <div className={styles.tradeContents}>
          <form autoComplete="off" className={styles.tradeForm}>
            <div style={{ display: "flex", margin: '14px 0px 12px 0px' }}>
              <input
                className={styles.tradeInput}
                autoComplete="off"
                id="buy"
                type="text"
                placeholder="shares"
                value={buyVal}
                onChange={(e) => handleChange(e, "b")}
              ></input>
              <button
                className={styles.buyButton}
                onClick={(e) => addToPortfolio(e, stock, buyVal)}
              >
                buy
              </button>
            </div>
            <div style={{ display: type === "watchlist" ? "none" : "flex" }}>
              <input
                className={styles.tradeInput}
                autoComplete="off"
                id="sell"
                type="text"
                placeholder="shares"
                value={sellVal}
                onChange={(e) => handleChange(e, "s")}
              ></input>
              <button
                className={`${styles.buyButton} ${styles.sellButton}`}
                onClick={(e) =>
                  addToPortfolio(e, stock, -1 * Number.parseInt(sellVal))
                }
              >
                sell
              </button>
            </div>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0px 12px 10px 12px' }}>
            <div style={{ color: 'white', fontSize: '22px' }}>${buyVal !== "" ? multStrings(buyVal, stock.data[99].cost) : multStrings(sellVal, stock.data[99].cost)}</div>
            <button className={styles.cancelButton} onClick={() => setVis(!vis)}>cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
