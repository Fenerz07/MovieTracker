import { useEffect, useState } from "react";
import style from '../styles/upcoming.css';

export default function UpcomingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/upcoming');
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

  function ReleaseDate(date){
    let releaseDate = new Date(date);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return releaseDate.toLocaleDateString('fr-FR', options);
  }

  return (
    <div className="upcomingall">
      <h1>Prochainement...</h1>
      <ul className="upcomingul">
        {movies.map((movie) => (
          <li key={movie.id}>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
            />
            <h3>{ReleaseDate(movie.release_date)}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}