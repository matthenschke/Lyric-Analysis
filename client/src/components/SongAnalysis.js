import React, { useState, useEffect } from "react";
import axios from "axios";

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
            <li
              key={index}
            >{`${key}: ${analysis.emotion.document.emotion[key]}`}</li>
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
          <div className="text-left">
            <div id="sentiment">
              <h2>Sentiment</h2>
              <p>{`Label: ${label}`}</p>
              <p>{`Score: ${score}`}</p>
            </div>
            <div id="concepts"></div>
            <ul id="emotion">{emotion}</ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div id="loading">Loading...</div>;
  }
};

export default SongAnalysis;
