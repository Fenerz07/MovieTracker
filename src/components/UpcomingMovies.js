import { useEffect, useState, useRef } from "react";
import style from '../styles/upcoming.css';

export default function UpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/upcoming');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

  }, []);

  function ReleaseDate(date) {
    let releaseDate = new Date(date);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return releaseDate.toLocaleDateString('fr-FR', options);
  }

  function compareDate(date) {
    let today = new Date();
    let releaseDate = new Date(date);
    if (today < releaseDate) {
      return ReleaseDate(date);
    }
  }

  function isImageValid(image) {
    return image !== null;
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

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

  return (
    <div className="upcoming-container">
      <h1>Prochainement...</h1>
      {loading ? (
        <div className="loading-spinner"></div> 
      ) : (
      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div className="carousel" ref={carouselRef}>
          {removeDuplicateMovies(movies).map((movie) => ( 
            compareDate(movie.release_date) && isImageValid(movie.poster_path) ? (
              <div className="carousel-item" key={movie.id}>
                <img 
                  draggable="false"
                  onClick={() => window.location.href = `/film/${movie.id}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h3>{compareDate(movie.release_date)}</h3>
              </div>
            ) : null
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
      )}
    </div>
  );
}
