import React, { useState, useEffect } from "react";
import PagePost from "./PagePost";
import axios from "axios";
import styles from "../../../../styles.css";

const News: React.FC<Props> = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getPolygon();
  }, []);

  const getPolygon = () => {
    const ticker = location.pathname.split("/");
    console.log(ticker);
    axios({
      method: "get",
      url: `https://api.polygon.io/v1/meta/symbols/${
        ticker[ticker.length - 1]
      }/news?perpage=50&page=1&apiKey=ktbj2shGj_Iz2moYDippfOyZCDQbBfHd`,
    }).then((response) => {
      const format = response.data.map((post) => (
        <PagePost key={post.title} post={post} />
      ));
      setNews(format);
    });
  };

  const searchReddit = (q: string) => {
    axios({
      method: "get",
      url: `https://www.reddit.com/r/wallstreetbets/search.json?q=${q}`,
    }).then((response) => {
      console.log(response.data.data.children);
    });
  };

  return (
    <div className={styles.news}>
      <div
        style={{ fontSize: "24px", fontWeight: "600", marginBottom: "16px" }}
      >
        News
      </div>
      <div className={styles.feed}>{news}</div>
    </div>
  );
};

export default News;
