import React, { Component } from "react";
import axios from "axios";

class Analysis extends Component {
  async componentDidMount() {
    console.log("hi");
    const { url } = this.props.location.state;
    const { data } = await axios.post("/", { url });
    console.log(data);
    this.setState({
      lyrics: data.lyrics,
      analysis: JSON.parse(data.analysis),
      dataRecieved: true
    });
    console.log(this.state.analysis);
  }

  // componentDidUpdate(){
  //   if (this.state.dataRecieved || this.state.analysis){
  //     this.setState({dataRecieved : false});
  //   }
  // }

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

      // let { concepts } = analysis;
      // concepts = concepts.map((concept, index) => {
      //   let { text, relevance } = concept;
      //   return (
      //     <li key={index}>
      //       <span>{`${text} `}</span>
      //       <span>{`Relevancy : ${relevance}`}</span>
      //     </li>
      //   );
      // });

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
              <div id="concepts">
                {/* <h2>Concepts</h2>
              <ul>{concepts}</ul> */}
              </div>
              <ul id="emotion">{emotion}</ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <div id="loading">Loading...</div>;
    }
  }
}

export default Analysis;
