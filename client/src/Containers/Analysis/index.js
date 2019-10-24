import React, { Component } from "react";
import axios from "axios";

class Analysis extends Component {
  async componentDidMount() {
    const { url } = this.props.location.state;
    const { data } = await axios.post("/", { url });
    console.log(data);
    this.setState({
      lyrics: data.lyrics,
      analysis: JSON.parse(data.analysis),
      dataRecieved: true
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      lyrics: "",
      analysis: null,
      dataRecieved: false
    };
  }
  render() {
    let { dataRecieved } = this.state;
    if (dataRecieved) {
      let { lyrics, analysis } = this.state;
      let { label, score } = analysis.sentiment.document;
      let {concepts} = analysis;
      concepts = concepts.map((concept, index) => {
        let {text, relevance} = concept;
        return (
          <li key = {index}>
            <span>{`${text} `}</span>
            <span>{`Relevancy : ${relevance}`}</span>
          </li>
        );
       });

      let {emotion} = analysis.emotion.document;
      emotion = Object.keys(emotion).map((key, index) => {
        return (
          <li key = {index}>
          {`${key}: ${emotion[key]}`}
          </li>
        );
      })
      console.log(emotion);
      console.log(analysis);
      return (
        <div id="analysis-page">
          <div id="lyrics">
            <h1>Song Lyrics</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>{lyrics}</p>
          </div>
          <div id="analysis">
            <h1>Analysis</h1>
            <div id="sentiment">
              <h2>Sentiment</h2>
              <p>{`Label: ${label}`}</p>
              <p>{`Score: ${score}`}</p>
              </div>
              <div id = "concepts">
              <ul>
                {concepts}
              </ul>
              </div>
              {emotion && <ul>
                {emotion}
              </ul>}
          </div>
        </div>
      );
    } else {
      return <div id = "loading">Loading</div>;
    }
  }
}

export default Analysis;
