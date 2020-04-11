import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

interface SongAnalysisProps {
  location: {
    state: {
      url: string;
    };
  };
}
const SongAnalysis: React.FC<SongAnalysisProps> = ({ location: { state } }) => {
  const [lyrics, setLyrics] = useState("");
  const [analysis, setAnalysis] = useState({} as Analysis);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const asyncFunction = async () => {
      const { url } = state;
      const { data } = await axios.post("/", { url });
      setLyrics(data.lyrics);
      setAnalysis(JSON.parse(data.analysis));
      setLoading(false);
    };

    asyncFunction();
  }, [loading]);

  if (!loading) {
    const {
      sentiment: {
        document: { score },
      },
    } = analysis;
    let emotion;
    let chartData: any = [];
    if (analysis.emotion) {
      emotion = Object.keys(analysis.emotion.document.emotion).forEach(
        (key) => {
          chartData.push([key, Number(analysis.emotion.document.emotion[key])]);
        }
      );
    }

    return (
      <div className="d-flex flex-column align-items-center container py-5 text-center">
        <div className="py-5 lyrics">
          <h1>Song Lyrics</h1>
          <p style={{ whiteSpace: "pre-wrap" }}>{lyrics}</p>
        </div>
        <div id="analysis">
          <h1 className="py-5-lg py-3 pl-n5">Analysis</h1>
          <div className="d-flex flex-lg-row flex-column justify-content-center align-items-center pl-5">
            <div className="sentiment pr-5">
              <h2>Sentiment</h2>
              <p className="lead">{`Score:  ${Number(score)}`}</p>
              <p className="small">
                *Score ranges from -1 (negative sentiment) to 1 (positive
                sentiment)
              </p>
            </div>

            {analysis.emotion && (
              <div>
                <div className="bar-chart">
                  <Chart
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[["Emotion", "Score"], ...chartData]}
                    options={{
                      title: "Emotion Scores",
                      chartArea: { width: "50%" },
                      hAxis: {
                        title: "Score",
                        minValue: 0,
                      },
                      vAxis: {
                        title: "Emotion",
                      },
                    }}
                  />
                </div>
                <p className="small pt-2">
                  *Score ranges from 0 (does not convey emotion) to 1 (conveys
                  emotion)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="loading">Loading...</div>;
  }
};

export default SongAnalysis;
