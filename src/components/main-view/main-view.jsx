import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// import { ProfileView } from "../profile-view/profile-view";

export const MainView =()=>{
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selMovie, setSelMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = "https://watchlist-api-e692810fd7a5.herokuapp.com";

  useEffect(()=>{
    if (!token) return;
    fetch(apiUrl+"/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  },[token]); //dependency array ensures fetch is called every time token changes 

  if (!user) return(
    <>
      Login:
      <LoginView
        onLoggedIn={ (user, token) =>{
          setUser(user);
          setToken(token);
        } }
        url={ apiUrl }
        />
      <br />
      or
      <br />
      <br />
      Signup:
      <SignupView
        url={ apiUrl }
      />
    </>
  );

  let content = isLoading ? <div>Loading...</div> :
    selMovie ? <MovieView
      movie={ selMovie }
      onBackClick={ ()=> setSelMovie(null) }/> :
    movies.length <1 ? <div>No movies in list.</div> :
    <div>{ movies.map( m =>
      <MovieCard
        key={ m.id }
        movie={ m }
        onMovieClick={ newMovieSel => setSelMovie(newMovieSel) }
    />)}</div>;

    return <>
        { content }
        <button
          onClick={ ()=>{
            setUser(null);
            setToken(null);
            localStorage.clear();
          } }
        >Logout</button>
      </>
};