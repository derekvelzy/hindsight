import React, { useState, useEffect } from 'react';
import Image from './media/Image.jsx'
const axios = require('axios');
import styles from '../../../styles.css';

const News = (props) => {
  const [latest, setLatest] = useState([])

  useEffect(() => {
    getReddit();
  }, []);

  const getReddit = () => {
    axios({
      method: 'get',
      url: 'https://www.reddit.com/r/wallstreetbets/hot.json',
    })
    .then((response) => {
      const posts = response.data.data.children;
      const postList = posts.map(post => {
        console.log(post)
        let media;
        if (!post.data.media && post.data.preview && post.data.url) {
          media = <img className="postImage" src={post.data.url} />
        }
        return (
          <Image post={post} />
        )
      })
      postList.shift();
      setLatest(postList)
    })
  }

  const searchReddit = (q) => {
    axios({
      method: 'get',
      url: `https://www.reddit.com/r/wallstreetbets/search.json?q=${q}`,
    })
    .then((response) => {
      console.log(response.data.data.children)
    })
  }

  return (
    <div className={styles.news}>
      <div>
        <p>r/wallstreetbets</p>
      </div>
      <div className={styles.feed}>
        {latest}
      </div>
    </div>
  )
}

export default News;