import { useEffect, useState } from "react";

export default function NowMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/popular');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  function PourcentageRate(rate) {
    return Math.round(rate * 10);
  }

  function scoreColor(rate) {
    if (rate > 80) {
      return "green";
    } else if (rate >= 60) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <div className="indexallmovies">
      <h1>Films du moment</h1>
      <ul className="indexulmovies">
        {movies.map((movie) => (
          <li key={movie.id}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
            />
            <h3 style={{ backgroundColor: scoreColor(PourcentageRate(movie.vote_average)) }}>
              {PourcentageRate(movie.vote_average)}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}