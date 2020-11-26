import React, { useState, useEffect } from 'react';
const axios = require('axios');

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
          <div className="post">
            <div style={{ textAlign: 'center', color: '#eb5b34' }}>
              <div>{post.data.ups}</div>
              <div>&#8593;</div>
            </div>
            <div className="postContent">
              <div>{post.data.title}</div>
              <div>{media}</div>
            </div>
          </div>
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
    <div className="news">
      <div>
        <p>r/wallstreetbets</p>
      </div>
      <div className="feed">
        {latest}
      </div>
    </div>
  )
}

export default News;