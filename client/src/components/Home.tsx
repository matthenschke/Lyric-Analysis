import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import axios from "axios";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [submitted, setSubmit] = useState(false);

  useEffect(() => {
    if (!submitted) {
      return;
    }
    axios
      .get(`songs/${query}`)
      .then(res => {
        const { hits } = res.data;
        setSongs(hits);
      })
      .catch(e => {
        console.log(e);
      });
  }, [submitted, query]);

  return (
    <div id="home" className="text-center">
      <div id="header" className="mt-5">
        <h1 className="mb-3">Welcome to my Lyric Sentiment Application!</h1>
        <h4 className="mb-5">
          To get started, type in an artist or a song in the search bar
        </h4>
      </div>
      <form
        id="form"
        onSubmit={(e): void => {
          e.preventDefault();
          setSubmit(true);
        }}
      >
        <input
          id="search-bar"
          type="text"
          placeholder="Please enter a song or an artist"
          onChange={e => {
            setQuery(e.target.value);
          }}
          value={query}
        ></input>
        <input
          id="submit-button"
          className="ml-4 btn btn-primary btn-large"
          type="submit"
          value="Find songs!"
        ></input>
      </form>
      {songs && <SongList songs={songs} />}
    </div>
  );
};

export default Home;
