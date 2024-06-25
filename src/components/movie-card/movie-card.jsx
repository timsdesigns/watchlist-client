import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  return (
    <Card
      className="h-100 vh-5 w-100 hover-overlay"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
      >
      <Card.Img
        variant="top"
        style={{ cursor: "pointer" }}
        onClick={() => onMovieClick(movie)}
        fluid
        src={ movie.image } />
      <Card.Body >
        <Card.Title>{ movie.title }</Card.Title>
        <Card.Text
          className={`card-text ${isTruncated? "truncate-multiline":""}`}
          style={{ padding: "0em", margin: "0em" }}>
          { movie.description }
        </Card.Text>
        <Button
          variant="link" size="sm"
          style={{ padding: "0px 0em 1em" }}
          onClick={()=> setIsTruncated(!isTruncated)}>
          { isTruncated? "Read More" : "Read Less" }
        </Button>
        <Card.Text
          style={{ textAlign: 'right', position: 'absolute', bottom: 5, right: 20 }}>
          { movie.genre.name }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
