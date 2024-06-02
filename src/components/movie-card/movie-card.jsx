export const MovieCard =({ movie, onMovieClick})=>
  <div onClick={()=> onMovieClick(movie)}>
    { movie.title }
  </div>;