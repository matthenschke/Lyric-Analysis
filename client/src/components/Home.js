import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import axios from "axios";

const Home = props => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState(null);
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
  console.log(query);
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
        onSubmit={e => {
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
      {/* <Container>
        <Row className="mt-5">
          <Col xs="4" className="mb-3">
            <Card style={{ flex: 1 }}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs="4" className="mb-3">
            <Card style={{ flex: 1 }}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs="4" className="mb-3">
            <Card style={{ flex: 1 }}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs="4" className="mb-3">
            <Card style={{ flex: 1 }}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs="4" className="mb-3">
            <Card style={{ flex: 1 }}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default Home;
