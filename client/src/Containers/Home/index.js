import React, { Component } from "react";
import SongList from "./Components/SongList";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      songs: null
    };
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    axios
      .get(`songs/${query}`)
      .then(res => {
        const {hits} = res.data;
        this.setState({songs : hits});
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { songs } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.query}
          ></input>
          <input type="submit" value="Submit!"></input>
        </form>
        {songs && <SongList songs = {songs} />}
      </div>
    );
  }
}

export default Home;
