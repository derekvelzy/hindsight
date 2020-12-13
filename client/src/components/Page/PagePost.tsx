import React, { useState, useEffect } from "react";
import styles from "../../../../styles.css";

type Props = {
  post: {};
};

const PagePost: React.FC<Props> = ({ post }) => {
  console.log(post);
  return (
    <div className={styles.pageNewsPost}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className={styles.pagePostTitle}>{post.title}</div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>{post.summary}</div>
          </div>
          <div>
            <div style={{ fontSize: "13px", marginBottom: "6px" }}>
              {post.source}
            </div>
            <div style={{ fontSize: "13px", color: "rgb(161, 161, 161)" }}>{post.timestamp}</div>
          </div>
        </div>
        <a rel="noreferrer" target="_blank" href={post.url}>
          <img className={styles.pagePostImage} src={post.image} />
        </a>
      </div>
    </div>
  );
};

export default PagePost;
