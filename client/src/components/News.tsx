import React, { useState, useEffect } from "react";
import Image from "./media/Image";
import Video from "./media/Video";
import axios from "axios";
import styles from "../../../styles.css";

const News: React.FC = () => {
  const [latestReddit, setLatest] = useState([]);

  useEffect(() => {
    getReddit();

  }, []);

  const getFalcon = () => {
    axios({
      method: "get",
      url:
        "https://api.polygon.io/v1/meta/symbols/AAPL/news?perpage=50&page=1&apiKey=ktbj2shGj_Iz2moYDippfOyZCDQbBfHd",
    }).then((response) => {
      console.log('polygon', response);
    });
  };

  const getReddit = () => {
    axios({
      method: "get",
      url: "https://www.reddit.com/r/wallstreetbets/hot.json",
    }).then((response) => {
      const posts = response.data.data.children;
      const postList = posts.map((post) => {
        let media;
        if (!post.data.media && post.data.preview && post.data.url) {
          return <Image key={post.data.id} post={post} />;
        } else if (post.data.media) {
          return <Video key={post.data.id} post={post} />;
        }
        return <div>asdfghjkl</div>
      });
      postList.shift();
      setLatest(postList);
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
      <div style={{ fontSize: '24px', fontWeight: '600' }}>Market News</div>
      <div className={styles.newsOptions}>
        <button className={`${styles.newsButton} ${styles.twitterBut}`}>Twitter</button>
        <button className={`${styles.newsButton} ${styles.yahooBut}`}>Yahoo Finance</button>
        <button className={`${styles.newsButton} ${styles.redditBut}`}>Reddit: r/stocks</button>
        <button className={`${styles.newsButton} ${styles.wsbBut}`}>Reddit: r/wallstreetbets</button>
      </div>
      <div className={styles.feed}>{latestReddit}</div>
    </div>
  );
};

export default News;
