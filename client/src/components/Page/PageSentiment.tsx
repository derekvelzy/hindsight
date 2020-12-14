import React, { useState, useEffect } from "react";
import styles from "../../../../styles.css";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  twitter: number;
  polygon: number;
};

const PageSentiment: React.FC<Props> = ({ twitter, polygon }) => {
  const data = [
    {
      name: "sentiment",
      twitter: Number.parseFloat(twitter),
      polygon: Number.parseFloat(polygon),
    },
  ];
  return (
    <div className={styles.sentiment}>
      <div>
        <div
          style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}
        >
          Sentiment Analysis
        </div>
        <div className={styles.barChartContainer}>
          <ResponsiveContainer width={200} height={200}>
            <BarChart
              className={styles.barChart}
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="polygon" fill="#6b5cf2" />
              <Bar dataKey="twitter" fill="#5cc8f2" />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.sentimentDetails}>
            <div>
              <div className={styles.seeWhatOthers}>
                See what others are saying
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      background: "#5cc8f2",
                      height: "10px",
                      width: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                  </div>
                  <div>Twitter Search</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      background: "#6b5cf2",
                      height: "10px",
                      width: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                  </div>
                  <div>Polygon News</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: "13px" }}>
              Analysis by Google Cloud Natural Language API
            </div>
          </div>
        </div>
      </div>
      <div className={styles.explain}>
        <div
          style={{
            textDecoration: "underline",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          What is this?
        </div>
        <div style={{ fontSize: "15px", lineHeight: "18px" }}>
          Sentiment analysis is a natural language processing algorithm used to
          determine the context of its input text. This example uses Twitter
          posts and news articles from Polygon.io for each stock to determine
          its rating between -1 to 1.
        </div>
      </div>
    </div>
  );
};

export default PageSentiment;
