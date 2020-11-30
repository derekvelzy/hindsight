import React, { useState } from 'react';

const Image = (props) => {
  const { post } = props;
  const [view, setView] = useState(false)

  return (
    <div className="post">
      <div style={{ textAlign: 'center', color: '#eb5b34' }}>
        <div>{post.data.ups}</div>
        <div>&#8593;</div>
      </div>
      <div className="postContent">
        <div>{post.data.title}</div>
        <div><img style={{ width: view ? '400px' : '40px' }} className="postImage" src={post.data.url} onClick={() => setView(!view)} /></div>
      </div>
    </div>
  )
}

export default Image;