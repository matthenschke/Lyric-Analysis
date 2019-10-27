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
        const { hits } = res.data;
        this.setState({ songs: hits });
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { songs } = this.state;
    return (
      <div id="home" className="text-center">
        <div id="header" className="mt-5">
          <h1 className="mb-3">Welcome to my Lyric Sentiment Application!</h1>
          <h4 className="mb-5">
            To get started, type in an artist or a song in the search bar
          </h4>
        </div>
        <form id = "form" onSubmit={this.handleSubmit}>
          <input id = "search-bar"
            type="text" placeholder = "Please enter a song or an artist"
            onChange={this.handleChange}
            value={this.state.query}
          ></input>
          <input id = "submit-button" className = "ml-4 btn btn-primary btn-large" type="submit" value="Find songs!"></input>
        </form>
        {songs && <SongList songs={songs} />}
      </div>
    );
  }
}

export default Home;
