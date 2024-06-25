import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncatedDescription, setTruncatedDescription] = useState(movie.description);

  useEffect(() => {
    const cardTextEl = document.querySelector(`#movie-card-${movie.id} .card-text`);
    if (!cardTextEl) return; // Avoid errors if element not yet rendered

    const actualHeight = cardTextEl.scrollHeight;
    const maxHeight = cardTextEl.clientHeight;

    if (actualHeight > maxHeight) {
      setIsTruncated(true);
      const dots = '...';
      let truncatedText = movie.description;

      while (cardTextEl.scrollHeight > cardTextEl.clientHeight) {
        truncatedText = truncatedText.substring(0, truncatedText.length - 1);
      }

      setTruncatedDescription(truncatedText + dots);
    } else {
      setIsTruncated(false);
      setTruncatedDescription(movie.description);
    }
  }, [movie.description]);

  return (
    <Card
      className="h-100 vh-5 w-100 hover-overlay"
      variant="link"
      onClick={() => onMovieClick(movie)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
    >
      <Card.Img variant="top" src={ movie.image } />
      <Card.Body >
        <Card.Title>{ movie.title }</Card.Title>
        <Card.Text
            className="card-text"
            style={{ maxHeight: '50px', overflow: 'hidden' }}>
          { isTruncated ? truncatedDescription : movie.description }
          <button onClick={()=> setIsTruncated(!isTruncated)}>
            { isTruncated? "Read More" : "Read Less" }
          </button>
        </Card.Text>
        <Card.Text style={{ textAlign: 'right', position: 'absolute', bottom: 5, right: 20 }}>
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
