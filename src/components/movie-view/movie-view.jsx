import { PropTypes } from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick })=>
  <div>
    <h4>{ movie.title }</h4>
    <p>{ movie.description }</p>
    <img className="w-100" src={ movie.image } alt={ movie.title + "-poster" } />
    <p style={{ textAlign: 'right' }}>{ movie.genre.name }</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Director: </span>
      <span style={{ textAlign: 'right' }}>{ movie.director.name }</span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>Actors:</span>
      <span style={{ textAlign: 'right' }}>{movie.actors.map((a) => a + ", ")}</span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>Featured:</span> 
      <span style={{ textAlign: 'right' }}>{ movie.featured ? "true" : false }</span>
    </div>
    <Button variant="primary" onClick={ onBackClick }>Back</Button>
  </div>;

MovieView.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.object,
    director: PropTypes.object,
    actors: PropTypes.array,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
