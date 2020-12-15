import React, { useState, useEffect } from "react";
import PagePost from "./PagePost";
import axios from "axios";
import styles from "../../../../styles.css";

type Props = {
  setPolygon: (arg: string) => void;
};

const News: React.FC<Props> = ({ setPolygon }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getPolygon();
  }, []);

  const getPolygon = () => {
    const ticker = location.pathname.split("/");
    axios({
      method: "get",
      url: `https://api.polygon.io/v1/meta/symbols/${
        ticker[ticker.length - 1]
      }/news?perpage=50&page=1&apiKey=ktbj2shGj_Iz2moYDippfOyZCDQbBfHd`,
    })
      .then((response) => {
        const format = response.data.map((post) => (
          <PagePost key={post.title} post={post} />
        ));
        setNews(format);
        return response;
      })
      .then((response) => {
        let string = "";
        response.data.forEach((article) => {
          string += article.summary;
        });
        axios({
          method: "post",
          url: `http://localhost:8020/polygon/${ticker[ticker.length - 1]}`,
          data: { articles: string },
        }).then((score) => {
          console.log(typeof score.data, score)
          setPolygon(score.data);
        });
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
