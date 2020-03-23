import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const SongAnalysis = props => {
  const [lyrics, setLyrics] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const asyncFunction = async () => {
      const { url } = props.location.state;
      const { data } = await axios.post("/", { url });
      console.log(data);
      setLyrics(data.lyrics);
      setAnalysis(JSON.parse(data.analysis));
      setLoading(false);
      console.log(analysis);
    };
    console.log(props);
    asyncFunction();
  }, [loading]);

  if (!loading) {
    let { label, score } = analysis.sentiment.document;
    let emotion = <h2>Emotional Analysis Not Available!</h2>;
    if (analysis.emotion) {
      emotion = Object.keys(analysis.emotion.document.emotion).map(
        (key, index) => {
          return (
            <li key={index}>{`${key}: ${Number(
              analysis.emotion.document.emotion[key]
            ).toFixed(2)}%`}</li>
          );
        }
      );
    }

    return (
      <div id="analysis-page">
        <div id="lyrics">
          <h1>Song Lyrics</h1>
          <p style={{ whiteSpace: "pre-wrap" }}>{lyrics}</p>
        </div>
        <div id="analysis">
          <h1>Analysis</h1>
          <div className="d-flex flex-row justify-content-center">
            <div id="sentiment" className="p-2">
              <h2>Sentiment</h2>
              <h3>{`Label: ${label}`}</h3>
              <h3>{`Score:  ${Number(score).toFixed(2)}%`}</h3>
            </div>
            <div className="p-2">
              <ul id="emotion">{emotion}</ul>
            </div>
          </div>
        </div>
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["City", "2010 Population", "2000 Population"],
            ["New York City, NY", 8175000, 8008000],
            ["Los Angeles, CA", 3792000, 3694000],
            ["Chicago, IL", 2695000, 2896000],
            ["Houston, TX", 2099000, 1953000],
            ["Philadelphia, PA", 1526000, 1517000]
          ]}
          options={{
            title: "Population of Largest U.S. Cities",
            chartArea: { width: "50%" },
            isStacked: true,
            hAxis: {
              title: "Total Population",
              minValue: 0
            },
            vAxis: {
              title: "City"
            }
          }}
        />
      </div>
    );
  } else {
    return <div id="loading">Loading...</div>;
  }
};

export default SongAnalysis;
