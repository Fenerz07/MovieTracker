import { useEffect, useState, useRef } from "react";
import style from '../styles/top.css';

export default function TopMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/top');
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

  return (
    <div className="upcoming-container">
      <h1>Meilleurs Films</h1>
      {loading ? (
        <div className="loading-spinner"></div> 
      ) : (
      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <div className="carousel-item" key={movie.id}>
                <img 
                  draggable="false"
                  onClick={() => window.location.href = `/film/${movie.id}`}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
      )}
    </div>
  );
}