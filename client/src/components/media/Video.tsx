import React, { useState } from "react";
import styles from "../../../../styles.css";

const Video: React.FC = (props) => {
  const { post } = props;
  const [view, setView] = useState(false)

  if (post.data.media.reddit_video) {
    return (
      <div className={styles.post}>
        <div style={{ textAlign: 'center', color: '#eb5b34' }}>
          <div>{post.data.ups}</div>
          <div>&#8593;</div>
        </div>
        <div className={styles.postContent}>
          <div>{post.data.title}</div>
          <div onClick={() => setView(!view)}>
            <video style={{ width: view ? '400px' : '400px' }} controls>
              <source src={post.data.media.reddit_video.fallback_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    )
  } else {
    console.log(post)
    return (
      <div>asdfgwqqqqqqq</div>
    )
  }
}

export default Video;