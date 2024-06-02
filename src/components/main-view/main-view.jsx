// import { SignupView } from "../signup-view/signup-view";
// import { LoginView } from "../login-view/login-view";
// import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { useState } from "react";

export const MainView =()=>{
  const [movies, setMovies] = useState([
    {
        genre: {
            name: "Animation",
            description: "A genre that uses animation techniques to create moving images."
        },
        director: {
            name: "Andrew Stanton",
            bio: "Andrew Stanton is an American film director, screenwriter, and producer known for his work on 'Wall-E', 'Finding Nemo', and 'Toy Story 3'.",
            birth: "1965-06-26T00:00:00.000Z",
            death: null
        },
        id: "660b1d97a4ab7530f89f9915",
        title: "Wall-E",
        description: "A robot named Wall-E, designed for waste collection, discovers a plant and falls in love with Eve, a sleek spaceship. Together, they embark on an adventure to find a new home for humans.",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4c/WALL-E_poster.jpg",
        actors: [
            "Ben Burtt",
            "Elissa Knight",
            "Jeff Garlin",
            "Laurie Metcalf",
            "Ellen DeGeneres"
        ],
        featured: "true"
    },
    {
        genre: {
            name: "Science Fiction",
            description: "A genre that explores imaginative and futuristic concepts such as advanced technology, space exploration, time travel, parallel universes, and extraterrestrial life."
        },
        director: {
            name: "Lana Wachowski",
            bio: "Lana Wachowski is a film director, screenwriter, and producer known for her work on The Matrix trilogy, Cloud Atlas, and V for Vendetta.",
            birth: "1965-09-29T00:00:00.000Z",
            death: null
        },
        id: "660b1d97a4ab7530f89f9913",
        title: "The Matrix",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        image: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
        actors: [
            "Keanu Reeves",
            "Laurence Fishburne",
            "Carrie-Anne Moss",
            "Hugo Weaving"
        ],
        featured: "true"
    },
    {
        genre: {
            name: "Biographical Drama",
            description: "A genre that explores the life of a real person, often focusing on their personal and professional life, and the challenges they faced."
        },
        director: {
            name: "Christopher Nolan",
            bio: "Sir Christopher Edward Nolan CBE (born 30 July 1970) is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, he is considered a leading filmmaker of the 21st century.",
            birth: "1970-07-30T00:00:00.000Z",
            death: null
        },
        id: "660b1d97a4ab7530f89f9910",
        title: "Oppenheimer",
        description: "A biographical drama about the life of theoretical physicist J. Robert Oppenheimer, focusing on his role in the development of the atomic bomb and the ethical dilemmas he faced.",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
        actors: [
            "Cillian Murphy",
            "Emily Blunt",
            "Robert Downey Jr.",
            "Florence Pugh",
            "Matt Damon"
        ],
        featured: "true"
    }
  ]);
  const [selMovie, setSelMovie] = useState(null);
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