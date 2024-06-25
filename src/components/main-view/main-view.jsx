import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
// import { ProfileView } from "../profile-view/profile-view";
import { API_BASE_URL } from "../../config/config";
import { Col, Row, Button, CardGroup, Card } from "react-bootstrap";

export const MainView =()=>{
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selMovie, setSelMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = API_BASE_URL; //"https://watchlist-api-e692810fd7a5.herokuapp.com";  // consume from ../../config/config.js

  useEffect(()=>{
    if (!token) {
      console.log("no token found");
      return;      
    }
    fetch(apiUrl+"/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data); // check out object structure
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
    })
    .catch(error => console.error('Fetch error:', error));
  },[token]); //dependency array ensures fetch is called every time token changes 

  if (!user) return(
    <>
    <Row>
      <Col>
        <CardGroup>
          <Card>
          <Card.Body>
            <Card.Title>Please Login:</Card.Title>
            <LoginView
              onLoggedIn={ (user, token) =>{
                setUser(user);
                setToken(token);
                } }
                url={ apiUrl }
                />
          </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
    or
    <Row>
      <Col>
        <CardGroup>
          <Card>
          <Card.Body>
            <Card.Title>Please Register:</Card.Title>
            <SignupView
              url={ apiUrl }
              />
          </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
    </>
  );

  let content = isLoading ? <Col>Loading...</Col> :
    selMovie ? <Col md={8}>
      <MovieView
        movie={ selMovie }
        onBackClick={ ()=> setSelMovie(null) }/>
    </Col> :
    movies.length <1 ? <Col>No movies in list.</Col> :
    <>{ movies.map( m =>
        <Col
          className="mb5"
          md="3">
          <MovieCard
            key={ m.id }
            movie={ m }
            onMovieClick={ newMovieSel => setSelMovie(newMovieSel) }
            />
        </Col>
      ) }
    </>;

    return <>
      <Row
            xs={1}
            md={2}
            lg={4}
            className="g-4 justify-content-md-center">
        { content }        
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={ ()=>{
                setUser(null);
                setToken(null);
                localStorage.clear();
              } }
              >Logout</Button>
        </Col>
      </Row>
      </>;
};