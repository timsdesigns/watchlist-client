// import { SignupView } from "../signup-view/signup-view";
// import { LoginView } from "../login-view/login-view";
// import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { useState, useEffect } from "react";

export const MainView =()=>{
  const [movies, setMovies] = useState([]);
  const [selMovie, setSelMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = "https://watchlist-api-e692810fd7a5.herokuapp.com/movies";

  useEffect(()=>{
    fetch(apiUrl)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        const moviesFromApi = data.map(m=>({
            id: m._id,
            title: m.Title,
            description: m.Description,
            genre: { name: m.Genre.Name },
            director: { name: m.Director.Name },
            actors: m.Actors,
            featured: m.Featured,
            image: m.ImagePath,
        }));
        setMovies(moviesFromApi);
        setIsLoading(false);
  });
    return ()=>{};
  },[]);

  return selMovie ? <MovieView
      movie={ selMovie }
      onBackClick={ ()=> setSelMovie(null) }/> :
    movies.length <1 ? <div>No movies in list.</div> :
    <div>{ movies.map( m =>
      <MovieCard
        key={ m.id }
        movie={ m }
        onMovieClick={ newMovieSel => setSelMovie(newMovieSel) }
    />)}</div>;
};