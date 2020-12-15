import React, { useState, useEffect } from "react";
import PageChart from "./PageChart";
import PageNews from "./PageNews";
import PageStock from "./PageStock";
import PageSentiment from "./PageSentiment";
import axios from "axios";
import styles from "../../../../styles.css";
import { Link } from "react-router-dom";

const StockPage: React.FC = () => {
  const [stockData, setStockData] = useState({
    name: "",
    ticker: "",
    shares: 0,
    data: [],
  });
  const [twitter, setTwitter] = useState(0);
  const [polygon, setPolygon] = useState(0);

  useEffect(() => {
    const relative = window.location.pathname.split("/");
    const current = relative[relative.length - 1];
    getOne(current);
  }, []);

  const getOne = (ticker) => {
    axios({
      method: "get",
      url: `http://localhost:8020/one/${ticker}`,
    })
      .then((response) => {
        console.log(response);
        const info = response.data[0];
        const data = info.data.map((point) => {
          return {
            name: point[0].date.substring(5),
            uv: point[0].cost,
            price: point[0].cost,
          };
        });
        const object = {
          ticker: info.ticker,
          name: info.name,
          shares: info.shares,
          data: data,
        };
        setStockData(object);
        return object;
      })
      .then((stock) => {
        axios({
          method: "get",
          url: `http://localhost:8020/twitter/${stock.ticker}`,
        }).then((score) => {
          console.log('new score', typeof score.data, score);
          setTwitter(score.data);
        });
      });
  };

  return (
    <div>
      <div className={`${styles.header} ${styles.headerContents}`}>
        <Link to="/" className={styles.logo} style={{ textDecoration: "none" }}>
          hindsight
        </Link>
      </div>
      <div className={`${styles.columns} ${styles.colContainer}`}>
        <div className={styles.col3}>
          <PageStock stockData={stockData} />
        </div>
        <div className={styles.col4}>
          <PageChart stockData={stockData} />
          <PageSentiment twitter={twitter} polygon={polygon} />
          <PageNews setPolygon={setPolygon} />
        </div>
      </div>
    </div>
  );
};

export default StockPage;
