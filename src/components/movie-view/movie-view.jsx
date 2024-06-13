import { PropTypes } from "prop-types";
export const MovieView = ({ movie, onBackClick })=>
  <div>
    <div>Title: { movie.title }</div>
    <div>Description: { movie.description }</div>
    <img src={ movie.image } alt={ movie.title + "-poster" } />
    <div>Genre: { movie.genre.name }</div>
    <div>Director: { movie.director.name }</div>
    <div>Actors: { movie.actors.map(a=>a+", ") }</div>
    <div>Featured: { movie.featured ? "true" : false }</div>
    <button onClick={ onBackClick }>Back</button>
  </div>;
MovieView.propTypes={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.object,
    director: PropTypes.string,
    actors: PropTypes.array,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
