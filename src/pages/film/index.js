import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/film/index.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedLength, setSelectedLength] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/randommovies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  function handleGenreChange(event) {
    setSelectedGenre(event.target.value);
  }

  function handleRankChange(event) {
    setSelectedRank(event.target.value);
  }

  function handleLengthChange(event) {
    setSelectedLength(event.target.value);
  }

  function getGenreId(genre) {
    const genreMap = {
      "Action": 28,
      "Comedy": 35,
      "Drama": 18,
      "Horror": 27,
      "Romance": 10749,
      "Thriller": 53,
    };
    return genreMap[genre] || 0;
  }

  function getRanking(rank) {
    const rankMap = {
      "popularity.desc": "popularity.desc",
      "release_date.desc": "release_date.desc",
      "vote_average.desc": "vote_average.desc",
    };
    return rankMap[rank] || "";
  }

  function getLength(length) {
    const lengthMap = {
      "short": 90,
      "medium": 120,
      "long": 180,
    };
    return lengthMap[length] || 0;
  }

  const removeDuplicateMovies = (movies) => {
    let uniqueMovies = [];
    let movieIds = [];
    movies.forEach((movie) => {
      if (!movieIds.includes(movie.id)) {
        uniqueMovies.push(movie);
        movieIds.push(movie.id);
      }
    });
    return uniqueMovies;
  }

  const filteredMovies = selectedGenre ? movies.filter(movie => movie.genre_ids.includes(getGenreId(selectedGenre))) : movies;
  const sortedMovies = selectedRank ? filteredMovies.sort((a, b) => {
    const rankKey = getRanking(selectedRank);
    return b[rankKey.split('.')[0]] - a[rankKey.split('.')[0]];
  }) : filteredMovies;
  const lengthMovies = selectedLength ? sortedMovies.filter(movie => movie.runtime <= getLength(selectedLength)) : filteredMovies;

  return (
    <div>
      <Header />
      <div className="allfilters">
        <div className="filtermovies">
          <div className="filtermoviescontent">
            <div className="filtermoviesselect">
              <select id="selectGenres" onChange={handleGenreChange}>
                <option value="">Genres</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedie</option>
                <option value="Drama">Drame</option>
                <option value="Horror">Horreur</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filterrank">
          <div className="filterrankcontent">
            <div className="filterrankselect">
              <select id="selectRank" onChange={handleRankChange}>
                <option value="">Classement</option>
                <option value="popularity.desc">Popularité</option>
                <option value="release_date.desc">Date de sortie</option>
                <option value="vote_average.desc">Note</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filterlenght">
          <div className="filterlenghtcontent">
            <div className="filterlenghtselect">
              <select id="selectLenght" onChange={handleLengthChange}>
                <option value="">Durée</option>
                <option value="long">Long</option>
                <option value="medium">Moyen</option>
                <option value="short">Court</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="indexallmovies">
        <h1>Films Aléatoires</h1>
        <ul className="indexulmovies">
          {filteredMovies && sortedMovies && lengthMovies ? removeDuplicateMovies(filteredMovies).map((movie) => (
            <li key={movie.id}>
              <a>
                <img 
                  draggable="false" 
                  onClick={() => window.location.href = `/film/${movie.id}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </a>
            </li>
          ) ) : null}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
