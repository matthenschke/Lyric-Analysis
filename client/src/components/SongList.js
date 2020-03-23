import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const SongList = props => {
  let { songs } = props;
  songs = songs.map((song, index) => {
    const {
      id,
      full_title: title,
      header_image_thumbnail_url: img,
      url
    } = song.result;
    return (
      <Col key={id} sm="4" className="mb-3">
        <Card className="h-100">
          <Card.Img variant="top" alt={title} src={img} />
          <Card.Body>
            <Card.Title className="pb-5 pt-3">{title}</Card.Title>
            <NavLink
              className="song-btn btn btn-primary btn-large mt-5"
              to={{
                pathname: `analysis/${id}`,
                state: { url: url }
              }}
            >
              View Analysis of this Song
            </NavLink>
          </Card.Body>
        </Card>
      </Col>

      // <li key={id} className="song container">
      //   <h1 className="song-title">{full_title}</h1>
      //   <img
      //     className="song-img text-center"
      //     alt=""
      //     src={header_image_thumbnail_url}
      //   />
      // </li>
    );
  });
  return songs ? (
    <Container>
      <Row className="mt-5">{songs}</Row>
    </Container>
  ) : (
    // <div>
    //   <h2 className="text-center">Songs Found:</h2>
    //   <ul>{songs}</ul>
    // </div>
    ""
  );
};

export default SongList;
